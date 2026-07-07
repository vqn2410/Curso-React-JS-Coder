import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const Item = ({ id, name, img, price, stock }) => {
    const { addItem } = useContext(CartContext);

    const handleQuickAdd = () => {
        addItem({ id, name, price }, 1);
    };

    return (
        <div className="col">
            <div className="card h-100 shadow-sm border-0">
                <img src={img} alt={name} className="card-img-top ItemImg" />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold text-dark">{name}</h5>
                    <p className="card-text text-muted mb-1">Precio: <span className="fw-semibold text-primary">${price}</span></p>
                    <p className="card-text text-muted small">Stock: {stock} uds.</p>
                    <div className="mt-auto d-flex flex-column gap-2 mt-3">
                        <button onClick={handleQuickAdd} className="btn btn-primary fw-semibold" disabled={stock === 0}>
                            Agregar al carrito
                        </button>
                        <Link to={`/item/${id}`} className="btn btn-outline-secondary fw-semibold">Ver detalle</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Item;
