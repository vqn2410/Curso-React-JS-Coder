import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const categories = ['celulares', 'laptops', 'tablets'];
const brands = {
    celulares: ['Samsung', 'Apple', 'Xiaomi', 'Motorola', 'Google', 'OnePlus'],
    laptops: ['Asus', 'Lenovo', 'HP', 'Dell', 'Apple', 'MSI', 'Acer'],
    tablets: ['Apple', 'Samsung', 'Lenovo', 'Amazon', 'Xiaomi']
};
const prefixes = ['Pro', 'Max', 'Ultra', 'Lite', 'Plus', 'Gamer', 'Elite', 'Air', 'Mini', 'Fold'];

const products = [];
for (let i = 1; i <= 50; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const brand = brands[category][Math.floor(Math.random() * brands[category].length)];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    
    let name = '';
    if (category === 'celulares') name = `Smartphone ${brand} ${prefix} ${Math.floor(Math.random()*15 + 1)}`;
    if (category === 'laptops') name = `Notebook ${brand} ${prefix} ${Math.floor(Math.random()*17 + 10)}"`;
    if (category === 'tablets') name = `Tablet ${brand} ${prefix} ${Math.floor(Math.random()*10 + 1)}`;

    const price = Math.floor(Math.random() * 1500) + 150;
    const stock = Math.floor(Math.random() * 50) + 5;
    const imgId = Math.floor(Math.random() * 10000);
    const img = `https://loremflickr.com/400/400/${category},gadget?lock=${imgId}`;

    products.push({
        name,
        price,
        stock,
        category,
        img,
        description: `Un excelente dispositivo de la categoría ${category}. Cuenta con las mejores prestaciones de la marca ${brand} en su edición ${prefix}, ideal para todas tus necesidades tecnológicas.`
    });
}

async function upload() {
    console.log("🚀 Iniciando la subida de 50 productos a Firestore...");
    const productsRef = collection(db, 'productos');
    
    let count = 0;
    for (const prod of products) {
        try {
            await addDoc(productsRef, prod);
            count++;
            console.log(`✅ Subido [${count}/50]: ${prod.name}`);
        } catch (error) {
            console.error(`❌ Error al subir ${prod.name}:`, error);
        }
    }
    
    console.log("🎉 ¡Proceso completado! Se subieron todos los productos.");
    process.exit(0);
}

upload();
