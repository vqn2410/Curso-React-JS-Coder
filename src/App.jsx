import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart';
import CheckoutForm from './components/CheckoutForm/CheckoutForm';
import MyOrders from './components/MyOrders/MyOrders';
import AdminPanel from './components/Admin/AdminPanel';
import Favorites from './components/Favorites/Favorites';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <BrowserRouter>
        <AuthProvider>
        <FavoritesProvider>
          <CartProvider>
            <NavBar />

          <main className="flex-grow-1 pb-5">
            <Routes>
              <Route path='/' element={<ItemListContainer />} />
              <Route path='/category/:categoryId' element={<ItemListContainer />} />
              <Route path='/item/:itemId' element={<ItemDetailContainer />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/checkout' element={<CheckoutForm />} />
              <Route path='/mis-compras' element={<MyOrders />} />
              <Route path='/admin' element={<AdminPanel />} />
              <Route path='/favoritos' element={<Favorites />} />
              <Route path='/registro' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='*' element={<h1 className="text-center mt-5">404 NOT FOUND</h1>} />
            </Routes>
          </main>
          <footer className="bg-dark text-white py-5 mt-auto shadow-lg">
            <div className="container">
              <div className="row text-center text-md-start">
                <div className="col-md-4 mb-4 mb-md-0">
                  <h5 className="fw-bold text-primary mb-3">CoderStore</h5>
                  <p className="mb-0">
                    ©Copyright 2026 todos los derechos reservados <br />
                    Created by <span className="text-info fw-bold">NVproductions</span>
                  </p>
                </div>
                <div className="col-md-4 mb-4 mb-md-0">
                  <h5 className="fw-bold mb-3">Categorías</h5>
                  <ul className="list-unstyled">
                    <li><Link to="/category/celulares" className="text-white-50 text-decoration-none">Celulares</Link></li>
                    <li><Link to="/category/laptops" className="text-white-50 text-decoration-none">Laptops</Link></li>
                    <li><Link to="/category/tablets" className="text-white-50 text-decoration-none">Tablets</Link></li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <h5 className="fw-bold mb-3">Administración</h5>
                  <ul className="list-unstyled">
                    <li><Link to="/admin" className="text-warning text-decoration-none fw-semibold">Acceso Admin (Ventas)</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
          </CartProvider>
        </FavoritesProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
