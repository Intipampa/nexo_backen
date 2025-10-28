import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs'; 

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

// 🔹 Obtener todos los usuarios
export const obtenerUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      include: { pais: true, sexo: true }, // Incluimos sexo (no genero)
      orderBy: { id: 'asc' },
    });
    
    // Limpieza: Aseguramos no devolver la contraseña hasheada
    const usuariosLimpios = usuarios.map(({ password, ...usuario }) => usuario);
    res.json(usuariosLimpios);
  } catch (error) {
    console.error('🔥 Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

// 🔹 Crear usuario (Incluye password, validación y hashing)
export const crearUsuario = async (req: Request, res: Response) => {
  try {
    // ❗ Incluimos password y confirmarPassword, y usamos sexoId
    const { nombre, apellidoPat, apellidoMat, correo, edad, ci, paisId, sexoId, password, confirmarPassword } = req.body;

    // 1. Validación de obligatorios
    if (!nombre || !apellidoPat || !correo || !edad || !ci || !paisId || !sexoId || !password || !confirmarPassword) {
      return res.status(400).json({ error: 'Faltan datos obligatorios (incluida la contraseña)' });
    }
    
    // 2. Validación de Contraseñas
    if (password.length < 8) {
        return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres' });
    }
    if (password !== confirmarPassword) {
        return res.status(400).json({ error: 'La contraseña y la confirmación no coinciden' });
    }

    // 3. Verificar correo duplicado
    const existe = await prisma.usuario.findUnique({ where: { correo } });
    if (existe) return res.status(400).json({ error: 'El correo ya está registrado' });

    // 4. Hashing de la contraseña
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const nuevoUsuario = await prisma.usuario.create({
      data: { 
            nombre, 
            apellidoPat, 
            apellidoMat, 
            correo, 
            password: hashedPassword, // ❗ Guardamos el hash
            edad: Number(edad), 
            ci, 
            paisId, 
            sexoId 
        },
    });

    // Devolvemos el usuario sin la contraseña
    const { password: _, ...usuarioSinPassword } = nuevoUsuario;
    res.status(201).json(usuarioSinPassword);
  } catch (error) {
    console.error('🔥 Error al crear usuario:', error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};

// 🔹 Editar usuario (Corregido para usar 'estado' y 'sexoId')
export const editarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // ❗ CAMBIO: Usamos 'sexoId' y 'estado'
    const { nombre, apellidoPat, apellidoMat, correo, edad, ci, paisId, sexoId, estado } = req.body;

    // Conversión de tipos: edad y estado son críticos
    const edadNum = edad ? Number(edad) : undefined;
    const estadoBool = typeof estado === 'string' ? estado === 'true' : estado;
    
    const usuarioActualizado = await prisma.usuario.update({
      where: { id: Number(id) },
      data: { 
            nombre, 
            apellidoPat, 
            apellidoMat, 
            correo, 
            edad: edadNum, 
            ci, 
            paisId, 
            sexoId, 
            estado: estadoBool // ❗ Campo correcto del modelo
        },
    });
    
    const { password: _, ...usuarioLimpio } = usuarioActualizado;
    res.json(usuarioLimpio);
  } catch (error) {
    console.error('🔥 Error al editar usuario:', error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

// 🔹 Cambiar estado (activar/desactivar) (Corregido para usar 'estado')
export const cambiarEstadoUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const usuario = await prisma.usuario.findUnique({ where: { id: Number(id) } });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const actualizado = await prisma.usuario.update({
      where: { id: Number(id) },
      // ❗ CAMBIO: Usamos 'estado' del modelo, no 'activo'
      data: { estado: !usuario.estado }, 
    });
    
    const { password: _, ...usuarioLimpio } = actualizado;
    res.json(usuarioLimpio);
  } catch (error) {
    console.error('🔥 Error al cambiar estado del usuario:', error);
    res.status(500).json({ error: 'Error al cambiar estado del usuario' });
  }
};