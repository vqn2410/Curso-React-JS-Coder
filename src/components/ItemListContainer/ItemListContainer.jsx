import { useState, useEffect } from 'react';
import ItemList from './ItemList';
import Sidebar from './Sidebar';
import { useParams } from 'react-router-dom';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';

const ItemListContainer = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [maxPrice, setMaxPrice] = useState(2000);
    const { categoryId } = useParams();

    useEffect(() => {
        setLoading(true);

        const collectionRef = categoryId
            ? query(collection(db, 'productos'), where('category', '==', categoryId))
            : collection(db, 'productos');

        getDocs(collectionRef)
            .then(response => {
                const productsAdapted = response.docs.map(doc => {
                    const data = doc.data();
                    return { id: doc.id, ...data };
                });
                setProducts(productsAdapted);
            })
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
    }, [categoryId]);

    if (loading) return (
        <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
            </div>
        </div>
    );

    const filteredProducts = products.filter(prod => prod.price <= maxPrice);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12 col-md-3 mb-4">
                    <Sidebar maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
                </div>
                <div className="col-12 col-md-9">
                    {filteredProducts.length > 0 ? (
                        <ItemList products={filteredProducts} />
                    ) : (
                        <div className="alert alert-warning text-center shadow-sm" role="alert">
                            No hay productos que coincidan con estos filtros.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ItemListContainer;
