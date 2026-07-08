import CartWidget from './CartWidget';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const NavBar = () => {
  const { user, userData, logoutUser } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg sticky-top shadow-sm bg-white">
      <div className="container">
        <Link to='/' className="navbar-brand d-flex align-items-center">
          <img src="/logo.png" alt="CoderStore" style={{ height: '80px', objectFit: 'contain', marginTop: '-15px', marginBottom: '-15px' }} />
        </Link>
        
        {/* Barra de búsqueda estilo ML (visual) */}
        <div className="d-none d-md-flex mx-auto" style={{ width: '40%' }}>
            <div className="input-group shadow-sm">
                <input type="text" className="form-control border-0" placeholder="Buscar productos, marcas y más..." />
                <button className="btn bg-white border-0" type="button">🔍</button>
            </div>
        </div>

        <div className="d-flex ms-auto align-items-center gap-4">
          {/* Menú de Usuario (Perfil) */}
          <div className="dropdown">
            <button className="btn btn-link text-dark text-decoration-none dropdown-toggle d-flex align-items-center gap-2 p-0 border-0" type="button" id="profileMenu" data-bs-toggle="dropdown" aria-expanded="false">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
              </svg>
              <span className="fw-semibold d-none d-md-inline text-dark text-decoration-none">
                  {user ? (userData?.nombre || 'Mi Perfil') : 'Ingresá'}
              </span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-3 rounded-3" aria-labelledby="profileMenu">
              {user ? (
                <>
                  <li><span className="dropdown-item-text fw-bold text-dark border-bottom pb-2 mb-2">Hola, {userData?.nombre || 'Usuario'}!</span></li>
                  <li><Link to="/mis-compras" className="dropdown-item py-2 fw-semibold text-secondary">🛍️ Mis Compras</Link></li>
                  <li><Link to="/favoritos" className="dropdown-item py-2 fw-semibold text-secondary">❤️ Favoritos</Link></li>
                  <li><button onClick={logoutUser} className="dropdown-item py-2 fw-semibold text-danger">Salir</button></li>
                </>
              ) : (
                <>
                  <li><Link to="/login" className="dropdown-item py-2 fw-semibold text-secondary">Iniciar Sesión</Link></li>
                  <li><Link to="/registro" className="dropdown-item py-2 fw-semibold text-secondary">Crear cuenta</Link></li>
                </>
              )}
            </ul>
          </div>

          <CartWidget />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
