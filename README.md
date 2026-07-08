# CoderStore - E-Commerce 🛒💻

Proyecto final desarrollado para el curso de **React JS** en [CoderHouse](https://www.coderhouse.com/). Es una aplicación web e-commerce completa construida desde cero utilizando React, Vite y Firebase.

## 👨‍🎓 Datos del Alumno / Creador
- **Nombre:** Nicolás Vergara (NVproductions)
- **Curso:** React JS
- **Comisión:** #95090
- **GitHub:** [vqn2410](https://github.com/vqn2410)

---

## 🚀 Características del Proyecto
- **Catálogo Dinámico:** Lectura de productos en tiempo real desde Firebase Firestore.
- **Navegación Fluida:** Filtrado por categorías (Celulares, Laptops, Tablets) usando React Router DOM.
- **Filtro de Precios Avanzado:** Un panel lateral (Sidebar) con un slider interactivo para filtrar productos en memoria sin sobrecargar la base de datos.
- **Carrito de Compras (Context API):** Agregar, eliminar y vaciar productos del carrito, con validación de stock y cálculo de precios totales en tiempo real.
- **Panel de Checkout:** Formulario de compra que valida stock contra Firebase usando Batch Updates (`writeBatch`) para evitar ventas de productos agotados, finalizando con la generación de una Orden con ID único.
- **Panel de Administración y Mis Compras:** Vista exclusiva para que los clientes consulten el historial de sus compras ingresando su correo, y un panel de administrador oculto (`/admin`) para revisar todas las transacciones históricas.
- **Diseño Moderno y Responsivo:** Interfaz construida íntegramente con Bootstrap, aplicando estilos profesionales, tarjetas con sombra, grillas y diseño móvil.

---

## 🛠️ Tecnologías Utilizadas
- **Frontend:** React (Hooks: `useState`, `useEffect`, `useContext`), Vite
- **Enrutamiento:** React Router DOM
- **Estilos:** Bootstrap 5, CSS3
- **Base de Datos & Backend as a Service:** Firebase (Firestore)

---

## ⚙️ Instalación y Configuración Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/vqn2410/Curso-React-JS-Coder.git
   cd Curso-React-JS-Coder
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar Variables de Entorno:**
   Creá un archivo `.env` en la raíz del proyecto y colocá tus credenciales de Firebase:
   ```env
   VITE_FIREBASE_API_KEY=tu_api_key
   VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
   VITE_FIREBASE_PROJECT_ID=tu_project_id
   VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
   VITE_FIREBASE_APP_ID=tu_app_id
   ```

4. **Ejecutar el proyecto en entorno de desarrollo:**
   ```bash
   npm run dev
   ```

---
> Proyecto creado con fines educativos y evaluativos para CoderHouse. ¡Gracias por pasarte!
