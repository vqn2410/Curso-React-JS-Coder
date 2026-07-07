import CartWidget from './CartWidget';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div className="container">
        <Link to='/' className="navbar-brand d-flex align-items-center gap-2">
          <img src="/logo.png" alt="TechStore" style={{ height: '40px', borderRadius: '8px' }} />
          <span className="fw-bold fs-4 text-info">TechStore</span>
        </Link>
        <div className="d-flex ms-auto align-items-center gap-4">
          <Link to='/mis-compras' className="text-white text-decoration-none fw-semibold">Mis Compras</Link>
          <CartWidget />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
