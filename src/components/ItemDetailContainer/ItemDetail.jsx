import { useContext, useState } from 'react';
import ItemCount from './ItemCount';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

const ItemDetail = ({ id, name, img, category, description, price, stock }) => {
    const [quantityAdded, setQuantityAdded] = useState(0);
    const { addItem } = useContext(CartContext);

    const handleOnAdd = (quantity) => {
        setQuantityAdded(quantity);
        const item = { id, name, price };
        addItem(item, quantity);
    };

    return (
        <div className="card shadow-sm border-0 overflow-hidden">
            <div className="row g-0">
                <div className="col-md-5 d-flex align-items-center bg-white p-4">
                    <img src={img} alt={name} className="img-fluid rounded mx-auto d-block" style={{ maxHeight: '400px', objectFit: 'contain' }} />
                </div>
                <div className="col-md-7">
                    <div className="card-body p-5 d-flex flex-column h-100 bg-light">
                        <span className="badge bg-secondary mb-2 align-self-start text-uppercase">{category}</span>
                        <h2 className="card-title display-6 fw-bold mb-3">{name}</h2>
                        <p className="card-text text-muted fs-5 mb-4">{description}</p>
                        
                        <div className="mt-auto border-top pt-4">
                            <h3 className="text-primary fw-bold mb-1">${price}</h3>
                            <p className="text-muted small mb-4">Stock disponible: {stock} unidades</p>
                            
                            <div className="bg-white p-3 rounded shadow-sm">
                                {quantityAdded > 0 ? (
                                    <Link to='/cart' className="btn btn-success w-100 fw-bold py-2">
                                        Terminar compra
                                    </Link>
                                ) : (
                                    <ItemCount initial={1} stock={stock} onAdd={handleOnAdd} />
                                )}
                            </div>
                            
                            <div className="mt-3 text-center">
                                <Link to='/' className="btn btn-outline-secondary w-100 fw-semibold">
                                    Explorar más productos
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetail;
