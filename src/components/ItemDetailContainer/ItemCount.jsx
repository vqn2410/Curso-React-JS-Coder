import { useState } from 'react';

const ItemCount = ({ stock, initial, onAdd }) => {
    const [quantity, setQuantity] = useState(initial);

    const increment = () => {
        if (quantity < stock) setQuantity(quantity + 1);
    };

    const decrement = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    return (
        <div className="d-flex flex-column align-items-center gap-3">
            <div className="input-group w-auto">
                <button className="btn btn-outline-secondary px-3" onClick={decrement}>-</button>
                <input 
                    type="text" 
                    className="form-control text-center fw-bold" 
                    style={{ maxWidth: '60px' }}
                    value={quantity} 
                    readOnly 
                />
                <button className="btn btn-outline-secondary px-3" onClick={increment}>+</button>
            </div>
            <button 
                className="btn btn-primary w-100 fw-semibold" 
                onClick={() => onAdd(quantity)} 
                disabled={!stock}
            >
                Agregar al carrito
            </button>
        </div>
    );
};

export default ItemCount;
