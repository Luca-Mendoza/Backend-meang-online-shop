"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncFromProduction = void 0;
const https_1 = __importDefault(require("https"));
const GQL_URL = 'https://backend-meang-online-shop.vercel.app/graphql';
function fetchGraphQL(query) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({ query });
        const req = https_1.default.request(GQL_URL, {
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
                }
                catch (e) {
                    reject(e);
                }
            });
        });
        req.on('error', reject);
        req.write(data);
        req.end();
    });
}
const syncFromProduction = (db) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const existingCount = yield db.collection('products_platforms').countDocuments();
        if (existingCount > 5) {
            console.log(`Local MongoDB already contains ${existingCount} products.`);
            return;
        }
        console.log('Downloading real production database from Vercel Backend...');
        const shopProductsRes = yield fetchGraphQL(`query { 
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
        const rawShopProducts = ((_b = (_a = shopProductsRes === null || shopProductsRes === void 0 ? void 0 : shopProductsRes.data) === null || _a === void 0 ? void 0 : _a.shopProducts) === null || _b === void 0 ? void 0 : _b.shopProducts) || [];
        if (rawShopProducts.length === 0) {
            console.log('No production data returned.');
            return;
        }
        const productsMap = new Map();
        const shopProductsToInsert = [];
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
                product_id: String((p === null || p === void 0 ? void 0 : p.id) || '1'),
                platform_id: String((pl === null || pl === void 0 ? void 0 : pl.id) || '1'),
                price: item.price,
                stock: item.stock,
                active: item.active !== false
            });
        }
        const productsToInsert = Array.from(productsMap.values());
        const platformsToInsert = Array.from(platformsMap.values());
        if (platformsToInsert.length > 0) {
            yield db.collection('platforms').deleteMany({});
            yield db.collection('platforms').insertMany(platformsToInsert);
        }
        if (productsToInsert.length > 0) {
            yield db.collection('products').deleteMany({});
            yield db.collection('products').insertMany(productsToInsert);
        }
        if (shopProductsToInsert.length > 0) {
            yield db.collection('products_platforms').deleteMany({});
            yield db.collection('products_platforms').insertMany(shopProductsToInsert);
        }
        console.log(`Successfully imported ${productsToInsert.length} real games & ${shopProductsToInsert.length} store items from Vercel Production!`);
    }
    catch (err) {
        console.error('Error syncing production database:', err);
    }
});
exports.syncFromProduction = syncFromProduction;
