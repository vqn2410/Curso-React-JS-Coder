import { useState, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { db } from '../../services/firebaseConfig';
import { collection, addDoc, Timestamp, writeBatch, doc, getDoc } from 'firebase/firestore';

const CheckoutForm = () => {
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [outOfStockItems, setOutOfStockItems] = useState([]);
    const { cart, total, clearCart } = useContext(CartContext);

    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');

    const handleConfirm = async (e) => {
        e.preventDefault();
        setLoading(true);
        setOutOfStockItems([]);

        try {
            const batch = writeBatch(db);
            const outOfStock = [];

            for (const item of cart) {
                const docRef = doc(db, 'productos', item.id);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    const currentStock = docSnap.data().stock;
                    if (currentStock >= item.quantity) {
                        batch.update(docRef, { stock: currentStock - item.quantity });
                    } else {
                        outOfStock.push({ ...item, stockDisponible: currentStock });
                    }
                }
            }

            if (outOfStock.length === 0) {
                const objOrder = {
                    buyer: { nombre, telefono, email },
                    items: cart,
                    total: total,
                    date: Timestamp.fromDate(new Date())
                };

                const orderRef = collection(db, 'ordenes');
                const orderAdded = await addDoc(orderRef, objOrder);
                await batch.commit(); // Descontamos el stock de la base de datos
                
                setOrderId(orderAdded.id);
                clearCart();
            } else {
                setOutOfStockItems(outOfStock);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Generando orden...</span>
            </div>
        </div>
    );

    if (outOfStockItems.length > 0) {
        return (
            <div className="container mt-5 text-center">
                <div className="card shadow-sm border-0 p-5 bg-light">
                    <h3 className="text-danger mb-3">⚠️ Algunos productos ya no tienen stock</h3>
                    <p className="fs-5">No pudimos procesar tu orden porque los siguientes productos superan el stock disponible:</p>
                    <ul className="list-group list-group-flush w-75 mx-auto my-3">
                        {outOfStockItems.map(item => (
                            <li key={item.id} className="list-group-item bg-transparent text-start">
                                <strong>{item.name}</strong> <br/>
                                <span className="text-danger small">Intentaste comprar: {item.quantity} | Stock actual: {item.stockDisponible}</span>
                            </li>
                        ))}
                    </ul>
                    <button className="btn btn-outline-primary mt-3" onClick={() => setOutOfStockItems([])}>
                        Volver al formulario
                    </button>
                </div>
            </div>
        );
    }

    if (orderId) {
        return (
            <div className="container mt-5 text-center">
                <div className="card shadow-sm border-0 p-5 bg-light">
                    <h2 className="text-success mb-3">¡Gracias por tu compra, {nombre}! 🎉</h2>
                    <p className="fs-5">El ID de tu orden es: <br/>
                        <strong className="bg-white px-3 py-2 rounded shadow-sm d-inline-block mt-3 text-primary">{orderId}</strong>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm border-0 p-4">
                        <h2 className="mb-4 text-center fw-bold">Completá tus datos</h2>
                        <form onSubmit={handleConfirm}>
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Nombre Completo</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={nombre} 
                                    onChange={({ target }) => setNombre(target.value)} 
                                    required 
                                    placeholder="Ej: Juan Pérez"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Teléfono</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={telefono} 
                                    onChange={({ target }) => setTelefono(target.value)} 
                                    required 
                                    placeholder="Ej: 1123456789"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-semibold">Email</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    value={email} 
                                    onChange={({ target }) => setEmail(target.value)} 
                                    required 
                                    placeholder="Ej: juan@mail.com"
                                />
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary btn-lg fw-bold">
                                    Generar Orden de Compra
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutForm;
