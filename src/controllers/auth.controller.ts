import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // ❗ Importar jsonwebtoken

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta_aqui'; // ❗ Usar una variable de entorno segura
const SALT_ROUNDS = 10;

// -----------------------------------------------------------
// 🔹 REGISTRAR USUARIO
// -----------------------------------------------------------
export const registrarUsuario = async (req: Request, res: Response) => {
  const {
    nombre,
    apellidoPat,
    apellidoMat,
    correo,
    password,
    confirmarPassword,
    edad,
    ci,
    paisId,
    sexoId, // Usamos sexoId según tu modelo
    cargo,
  } = req.body;

  // Validación de campos obligatorios
  if (!nombre || !apellidoPat || !apellidoMat || !correo || !password || !confirmarPassword || !edad || !ci || !paisId || !sexoId) {
    return res.status(400).json({ error: 'Faltan campos obligatorios. Revise todos los campos de información personal y credenciales.' });
  }

  // Validación de Contraseña
  if (password.length < 8) {
    return res.status(400).json({ error: 'La clave debe tener al menos 8 caracteres.' });
  }
  if (password !== confirmarPassword) {
    return res.status(400).json({ error: 'Las claves no coinciden.' });
  }

  try {
    // 1. Verificar duplicados (correo y CI)
    let usuarioExistente = await prisma.usuario.findUnique({ where: { correo } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'Correo ya registrado.' });
    }
    usuarioExistente = await prisma.usuario.findUnique({ where: { ci } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'Cédula ya registrada.' });
    }

    // 2. Hashing de la contraseña
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS); // Usamos SALT_ROUNDS = 10

    // 3. Creación del usuario
    await prisma.usuario.create({
      data: {
        nombre,
        apellidoPat,
        apellidoMat,
        correo,
        password: hashedPassword,
        edad: Number(edad), 
        ci,
        paisId: Number(paisId), 
        sexoId: Number(sexoId), 
        // El cargo es opcional según tu modelo, si no se proporciona, es null
        cargo: cargo || null, 
      },
    });
    
    res.status(201).json({ mensaje: 'Registro exitoso. Puede iniciar sesión.' });
  } catch (error) {
    console.error('🔥 Error en el registro:', error);
    res.status(500).json({ error: 'Error del servidor al registrar.' });
  }
};

// -----------------------------------------------------------
// 🔹 LOGIN DE USUARIO (con JWT)
// -----------------------------------------------------------
export const loginUsuario = async (req: Request, res: Response) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).json({ error: 'Falta correo o clave.' });
  }

  try {
    // 1. Buscar usuario
    const usuario = await prisma.usuario.findUnique({
      where: { correo },
    });
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }
    
    // ❗ Opcional: Verificar si el usuario está activo (campo 'estado')
    if (!usuario.estado) {
        return res.status(401).json({ error: 'Usuario inactivo. Contacte a administración.' });
    }

    // 2. Comparar contraseña
    const esPasswordValido = await bcrypt.compare(password, usuario.password);
    if (!esPasswordValido) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    // 3. Generar JWT
    const token = jwt.sign(
        { userId: usuario.id, cargo: usuario.cargo }, 
        JWT_SECRET, 
        { expiresIn: '1d' } // Token expira en 1 día
    );

    // 4. Respuesta exitosa
    res.status(200).json({
      mensaje: 'Login exitoso.',
      token, // Devolvemos el token JWT
      usuario: { 
            id: usuario.id, 
            nombre: usuario.nombre, 
            correo: usuario.correo, 
            cargo: usuario.cargo 
        }, 
    });
  } catch (error) {
    console.error('🔥 Error en el login:', error);
    res.status(500).json({ error: 'Error del servidor al loguear.' });
  }
};