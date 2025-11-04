import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // --- Datos de Catálogo Fijo ---
  const paises = [
    'Bolivia', 'Perú', 'Brasil', 'Paraguay', 'Argentina', 'Chile', 'Uruguay', 'Ecuador', 'Colombia'
  ];
  const sexos = ['Masculino', 'Femenino', 'Otro'];
  
  // 1. Catálogo de Géneros Literarios
  const generosLiterarios = [
    'Ficción', 'No Ficción', 'Ciencia Ficción', 'Fantasía', 'Misterio', 
    'Thriller', 'Romance', 'Poesía', 'Biografía', 'Historia'
  ];

  // 2. Catálogo de Editoriales
  const editoriales = [
    'Planeta', 'Alfaguara', 'Santillana', 'HarperCollins', 'Penguin Random House', 'Anagrama'
  ];

  // --- Inserción de Países ---
  for (const nombre of paises) {
    await prisma.pais.upsert({
      where: { nombre },
      update: {},
      create: { nombre },
    });
  }

  // --- Inserción de Sexos ---
  for (const nombre of sexos) {
    await prisma.sexo.upsert({
      where: { nombre },
      update: {},
      create: { nombre },
    });
  }

  // --- Inserción de Géneros Literarios ---
  for (const nombre of generosLiterarios) {
    await prisma.generoLiterario.upsert({
      where: { nombre },
      update: {},
      create: { nombre },
    });
  }

  // --- Inserción de Editoriales ---
  for (const nombre of editoriales) {
    await prisma.editorial.upsert({
      where: { nombre },
      update: {},
      create: { nombre },
    });
  }

  console.log('✅ Países, sexos, géneros literarios y editoriales insertados correctamente');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
  