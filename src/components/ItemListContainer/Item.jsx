import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { FavoritesContext } from '../../context/FavoritesContext';

const Item = ({ id, name, img, price, stock, category }) => {
    const { addItem, getProductQuantity } = useContext(CartContext);
    const { toggleFavorite, isFavorite } = useContext(FavoritesContext);

    const quantityInCart = getProductQuantity(id);
    const favoriteStatus = isFavorite(id);

    const handleQuickAdd = () => {
        addItem({ id, name, price }, 1);
    };

    return (
        <div className="col">
            <div className="card h-100 shadow-sm border-0 position-relative">
                {/* Botón Favorito */}
                <div className="FavoriteIcon" onClick={() => toggleFavorite({ id, name, img, price, stock, category })}>
                    {favoriteStatus ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ff5a1f" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#6c757d" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                        </svg>
                    )}
                </div>

                <img src={img} alt={name} className="card-img-top ItemImg pt-4" />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold text-dark">{name}</h5>
                    <p className="card-text text-muted mb-1">Precio: <span className="fw-semibold text-success fs-5">${price}</span></p>
                    
                    <div className="d-flex justify-content-between align-items-center mt-2 mb-3">
                        <small className="text-muted">Stock: {stock} uds.</small>
                        {quantityInCart > 0 && (
                            <span className="badge bg-info text-dark rounded-pill">🛒 {quantityInCart} en carrito</span>
                        )}
                    </div>

                    <div className="mt-auto d-flex flex-column gap-2">
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
