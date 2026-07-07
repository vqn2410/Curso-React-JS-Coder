import { useState, useEffect } from 'react';
import ItemDetail from './ItemDetail';
import { useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { itemId } = useParams();

    useEffect(() => {
        setLoading(true);

        const docRef = doc(db, 'productos', itemId);

        getDoc(docRef)
            .then(response => {
                const data = response.data();
                const productAdapted = { id: response.id, ...data };
                setProduct(productAdapted);
            })
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
    }, [itemId]);

    if (loading) return (
        <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
            </div>
        </div>
    );

    if (!product) return (
        <div className="container mt-5">
            <div className="alert alert-danger text-center" role="alert">
                El producto no existe o fue eliminado.
            </div>
        </div>
    );

    return (
        <div className="container mt-4 mb-5">
            <ItemDetail {...product} />
        </div>
    );
};

export default ItemDetailContainer;
