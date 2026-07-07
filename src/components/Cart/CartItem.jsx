import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const CartItem = ({ id, name, price, quantity }) => {
    const { removeItem } = useContext(CartContext);

    return (
        <li className="list-group-item p-4">
            <div className="row align-items-center">
                <div className="col-md-4">
                    <h5 className="fw-bold mb-1">{name}</h5>
                </div>
                <div className="col-md-2 text-center">
                    <span className="text-muted small d-block d-md-none">Cantidad</span>
                    <span className="fw-semibold">{quantity} uds.</span>
                </div>
                <div className="col-md-3 text-center">
                    <span className="text-muted small d-block d-md-none">Subtotal</span>
                    <span className="fw-bold text-primary">${price * quantity}</span>
                </div>
                <div className="col-md-3 text-end mt-3 mt-md-0">
                    <button onClick={() => removeItem(id)} className="btn btn-sm btn-outline-danger">
                        🗑️ Eliminar
                    </button>
                </div>
            </div>
        </li>
    );
};

export default CartItem;
