import { useContext } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';
import Item from '../ItemListContainer/Item';
import { Link } from 'react-router-dom';

const Favorites = () => {
    const { favorites } = useContext(FavoritesContext);

    if (favorites.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <div className="card shadow-sm border-0 p-5 bg-white">
                    <h2 className="mb-4 fw-bold">No tenés productos favoritos aún 💔</h2>
                    <p className="text-muted mb-4 fs-5">Agregá los productos que más te gusten haciendo clic en el corazón para guardarlos acá y comprarlos después.</p>
                    <Link to='/' className="btn btn-primary btn-lg mx-auto fw-bold" style={{ maxWidth: '300px' }}>
                        Explorar productos
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4 mb-5">
            <h2 className="mb-4 fw-bold">Mis Favoritos</h2>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {favorites.map(prod => <Item key={prod.id} {...prod} />)}
            </div>
        </div>
    );
};

export default Favorites;
