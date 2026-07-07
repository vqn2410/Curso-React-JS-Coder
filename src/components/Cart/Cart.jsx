import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, clearCart, totalQuantity, total } = useContext(CartContext);

    if (totalQuantity === 0) {
        return (
            <div className="container mt-5 text-center">
                <div className="card shadow-sm border-0 p-5">
                    <h2 className="mb-4">Tu carrito está vacío 🛒</h2>
                    <Link to='/' className="btn btn-primary btn-lg mx-auto" style={{ maxWidth: '300px' }}>
                        Volver a la tienda
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4 mb-5">
            <h2 className="mb-4 fw-bold">Tu Carrito</h2>
            <div className="row">
                <div className="col-lg-8">
                    <div className="card shadow-sm border-0 mb-4">
                        <ul className="list-group list-group-flush">
                            {cart.map(p => <CartItem key={p.id} {...p} />)}
                        </ul>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card shadow-sm border-0 bg-light p-4 sticky-top" style={{ top: '80px' }}>
                        <h4 className="fw-bold mb-4 border-bottom pb-3">Resumen de Compra</h4>
                        <div className="d-flex justify-content-between mb-3">
                            <span className="fs-5">Total a pagar:</span>
                            <span className="fs-4 fw-bold text-primary">${total}</span>
                        </div>
                        <div className="d-grid gap-2 mt-4">
                            <Link to='/checkout' className="btn btn-success btn-lg fw-bold">
                                Finalizar Compra
                            </Link>
                            <button onClick={() => clearCart()} className="btn btn-outline-danger">
                                Vaciar carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
