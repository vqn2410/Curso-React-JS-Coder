import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const CartWidget = () => {
    const { totalQuantity } = useContext(CartContext);

    return (
        <Link to='/cart' className="btn btn-outline-info position-relative">
            🛒
            {totalQuantity > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalQuantity}
                    <span className="visually-hidden">productos en carrito</span>
                </span>
            )}
        </Link>
    );
};

export default CartWidget;
