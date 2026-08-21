import http from 'https';

const GQL_URL = 'https://backend-meang-online-shop.vercel.app/graphql';

function fetchGraphQL(query: string) {
  return new Promise<any>((resolve, reject) => {
    const data = JSON.stringify({ query });
    const req = http.request(GQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

export const syncFromProduction = async (db: any) => {
  try {
    const existingCount = await db.collection('products_platforms').countDocuments();
    if (existingCount > 5) {
      console.log(`Local MongoDB already contains ${existingCount} products.`);
      return;
    }

    console.log('Downloading real production database from Vercel Backend...');

    const shopProductsRes = await fetchGraphQL(`query { 
      shopProducts(itemsPage: 500) { 
        shopProducts { 
          id 
          price 
          stock 
          active 
          product { id name slug img }
          platform { id name slug }
        } 
      } 
    }`);

    const rawShopProducts = shopProductsRes?.data?.shopProducts?.shopProducts || [];

    if (rawShopProducts.length === 0) {
      console.log('No production data returned.');
      return;
    }

    const productsMap = new Map();
    const shopProductsToInsert: any[] = [];
    const platformsMap = new Map();

    for (const item of rawShopProducts) {
      const p = item.product;
      const pl = item.platform;

      if (p && p.id && !productsMap.has(p.id)) {
        productsMap.set(p.id, {
          id: String(p.id),
          name: p.name,
          slug: p.slug || p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          img: p.img,
          clip: '',
          rating: { value: 4.8, count: 250 },
          genres: ['1', '2']
        });
      }

      if (pl && pl.id && !platformsMap.has(pl.id)) {
        platformsMap.set(pl.id, {
          id: String(pl.id),
          name: pl.name,
          slug: pl.slug || pl.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        });
      }

      shopProductsToInsert.push({
        id: String(item.id),
        product_id: String(p?.id || '1'),
        platform_id: String(pl?.id || '1'),
        price: item.price,
        stock: item.stock,
        active: item.active !== false
      });
    }

    const productsToInsert = Array.from(productsMap.values());
    const platformsToInsert = Array.from(platformsMap.values());

    if (platformsToInsert.length > 0) {
      await db.collection('platforms').deleteMany({});
      await db.collection('platforms').insertMany(platformsToInsert);
    }
    if (productsToInsert.length > 0) {
      await db.collection('products').deleteMany({});
      await db.collection('products').insertMany(productsToInsert);
    }
    if (shopProductsToInsert.length > 0) {
      await db.collection('products_platforms').deleteMany({});
      await db.collection('products_platforms').insertMany(shopProductsToInsert);
    }

    console.log(`Successfully imported ${productsToInsert.length} real games & ${shopProductsToInsert.length} store items from Vercel Production!`);

  } catch (err) {
    console.error('Error syncing production database:', err);
  }
};
