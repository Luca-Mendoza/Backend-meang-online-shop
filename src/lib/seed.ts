import { Db } from 'mongodb';

export const seedDatabase = async (db: Db) => {
  const productsCount = await db.collection('products').countDocuments();
  if (productsCount > 0) {
    console.log('Database already has data. Skipping seed.');
    return;
  }

  console.log('Seeding full game catalog for Gamezonia...');

  // 1. Genres
  const genres = [
    { id: '1', name: 'Acción', slug: 'accion' },
    { id: '2', name: 'Aventura', slug: 'aventura' },
    { id: '3', name: 'RPG', slug: 'rpg' },
    { id: '4', name: 'Deportes', slug: 'deportes' },
    { id: '5', name: 'Estrategia', slug: 'estrategia' },
    { id: '6', name: 'Carreras', slug: 'carreras' }
  ];
  await db.collection('genres').insertMany(genres);

  // 2. Platforms
  const platforms = [
    { id: '1', name: 'PlayStation 4', slug: 'ps4' },
    { id: '2', name: 'PlayStation 5', slug: 'ps5' },
    { id: '3', name: 'PC', slug: 'pc' },
    { id: '4', name: 'Xbox Series X', slug: 'xbox-series-x' },
    { id: '5', name: 'Nintendo Switch', slug: 'nintendo-switch' }
  ];
  await db.collection('platforms').insertMany(platforms);

  // 3. Products (Base catalog)
  const products = [
    {
      id: '1',
      name: 'Cyberpunk 2077',
      slug: 'cyberpunk-2077',
      img: 'https://m.media-amazon.com/images/I/81q2Kvw1z+L._AC_SL1500_.jpg',
      clip: '',
      rating: { value: 4.5, count: 120 },
      genres: ['1', '3']
    },
    {
      id: '2',
      name: 'The Witcher 3: Wild Hunt',
      slug: 'the-witcher-3-wild-hunt',
      img: 'https://m.media-amazon.com/images/I/81xU212g00L._AC_SL1500_.jpg',
      clip: '',
      rating: { value: 4.9, count: 350 },
      genres: ['2', '3']
    },
    {
      id: '3',
      name: 'FIFA 23',
      slug: 'fifa-23',
      img: 'https://m.media-amazon.com/images/I/81Kj6qL3t+L._AC_SL1500_.jpg',
      clip: '',
      rating: { value: 4.2, count: 90 },
      genres: ['4']
    },
    {
      id: '4',
      name: 'God of War Ragnarök',
      slug: 'god-of-war-ragnarok',
      img: 'https://m.media-amazon.com/images/I/81w+r2o2pTL._AC_SL1500_.jpg',
      clip: '',
      rating: { value: 4.95, count: 500 },
      genres: ['1', '2']
    },
    {
      id: '5',
      name: 'Elden Ring',
      slug: 'elden-ring',
      img: 'https://m.media-amazon.com/images/I/81cK3Q7Z8IL._AC_SL1500_.jpg',
      clip: '',
      rating: { value: 4.88, count: 410 },
      genres: ['1', '3']
    },
    {
      id: '6',
      name: 'Red Dead Redemption 2',
      slug: 'red-dead-redemption-2',
      img: 'https://m.media-amazon.com/images/I/81tD8U7pE5L._AC_SL1500_.jpg',
      clip: '',
      rating: { value: 4.97, count: 620 },
      genres: ['1', '2']
    },
    {
      id: '7',
      name: 'Grand Theft Auto V',
      slug: 'grand-theft-auto-v',
      img: 'https://m.media-amazon.com/images/I/816nC6t6ZVL._AC_SL1500_.jpg',
      clip: '',
      rating: { value: 4.85, count: 890 },
      genres: ['1', '2']
    },
    {
      id: '8',
      name: 'Hollow Knight',
      slug: 'hollow-knight',
      img: 'https://m.media-amazon.com/images/I/81-fS991BPL._AC_SL1500_.jpg',
      clip: '',
      rating: { value: 4.92, count: 310 },
      genres: ['1', '2']
    },
    {
      id: '9',
      name: 'Grand Turismo 7',
      slug: 'gran-turismo-7',
      img: 'https://m.media-amazon.com/images/I/81jP4v-zGLL._AC_SL1500_.jpg',
      clip: '',
      rating: { value: 4.4, count: 180 },
      genres: ['6']
    },
    {
      id: '10',
      name: 'The Legend of Zelda: Tears of the Kingdom',
      slug: 'zelda-tears-of-the-kingdom',
      img: 'https://m.media-amazon.com/images/I/81mF6XW6JYL._AC_SL1500_.jpg',
      clip: '',
      rating: { value: 4.99, count: 750 },
      genres: ['2', '3']
    }
  ];
  await db.collection('products').insertMany(products);

  // 4. Shop Products (products_platforms)
  const shopProducts = [
    { id: '1', product_id: '1', platform_id: '3', price: 29.99, stock: 25, active: true },
    { id: '2', product_id: '2', platform_id: '1', price: 19.99, stock: 15, active: true },
    { id: '3', product_id: '3', platform_id: '2', price: 34.99, stock: 40, active: true },
    { id: '4', product_id: '4', platform_id: '1', price: 24.99, stock: 30, active: true },
    { id: '5', product_id: '5', platform_id: '3', price: 34.99, stock: 50, active: true },
    { id: '6', product_id: '6', platform_id: '1', price: 29.99, stock: 20, active: true },
    { id: '7', product_id: '7', platform_id: '3', price: 14.99, stock: 100, active: true },
    { id: '8', product_id: '8', platform_id: '5', price: 9.99, stock: 45, active: true },
    { id: '9', product_id: '9', platform_id: '2', price: 49.99, stock: 12, active: true },
    { id: '10', product_id: '10', platform_id: '5', price: 59.99, stock: 35, active: true }
  ];
  await db.collection('products_platforms').insertMany(shopProducts);

  console.log('Database seeded successfully with full game catalog!');
};
