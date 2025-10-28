import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const paises = [
    'Bolivia', 'Perú', 'Brasil', 'Paraguay', 'Argentina', 'Chile', 'Uruguay', 'Ecuador', 'Colombia'
  ];
  const sexos = ['Masculino', 'Femenino', 'Otro'];

  for (const nombre of paises) {
    await prisma.pais.upsert({
      where: { nombre },
      update: {},
      create: { nombre },
    });
  }

  for (const nombre of sexos) {
    await prisma.sexo.upsert({
      where: { nombre },
      update: {},
      create: { nombre },
    });
  }

  console.log('✅ Países y sexos insertados correctamente');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
