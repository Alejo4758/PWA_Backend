import 'dotenv/config';
import prisma from './prismaClient.js';

async function main() {
  console.log('Cargando 30 relojes...');

  const relojes = [];
  const marcasPorCategoria = {
    "Buceo": ["Rolex", "Omega", "Seiko"],
    "Deportivo": ["TAG Heuer", "Casio", "Tissot"],
    "Elegante": ["Cartier", "Patek Philippe", "Longines"],
    "Casual": ["Citizen", "Timex", "Fossil"]
  };
  const categorias = Object.keys(marcasPorCategoria);

  for (let i = 1; i <= 30; i++) {
    const categoria = categorias[i % categorias.length];
    const marcasDeCategoria = marcasPorCategoria[categoria];
    const marca = marcasDeCategoria[i % marcasDeCategoria.length];

    relojes.push({
      nombre: `Reloj ${marca} v${i}`,
      marca: marca,
      precio: parseFloat((1000 + i * 150.5).toFixed(2)),
      materiales: ["Acero Oystersteel", i % 2 === 0 ? "Cerámica" : "Cristal de Zafiro"],
      imagen: `https://ejemplo.com/reloj-${i}.jpg`,
      resistencia_agua: i % 3 === 0 ? "300 metros" : "100 metros",
      categoria: categoria,
      stock: Math.floor(Math.random() * 10) + 1,
      destacado: i % 4 === 0,
      detalles_breve: `Un excelente reloj de la categoría ${categoria}.`,
      detalles: `Este modelo ${marca} cuenta con materiales de alta calidad. Edición nro ${i}.`
    });
  }

  // Verifica que diga prisma.reloj o prisma.watch según tu schema
  await prisma.reloj.createMany({
    data: relojes,
  });

  console.log('¡Se cargaron los 30 relojes con éxito!');
}

main()
  .catch((e) => {
    console.error('Error al ejecutar el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });