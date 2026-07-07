import { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import { Link } from 'react-router-dom';

const MyOrders = () => {
    const [email, setEmail] = useState('');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSearched(true);
        setOrders([]);

        try {
            const q = query(collection(db, 'ordenes'), where('buyer.email', '==', email));
            const querySnapshot = await getDocs(q);
            
            const fetchedOrders = [];
            querySnapshot.forEach((doc) => {
                fetchedOrders.push({ id: doc.id, ...doc.data() });
            });
            
            setOrders(fetchedOrders);
        } catch (error) {
            console.error("Error al buscar órdenes:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm border-0 p-4 mb-4">
                        <h2 className="mb-4 text-center fw-bold">Mis Compras</h2>
                        <form onSubmit={handleSearch} className="d-flex gap-2">
                            <input 
                                type="email" 
                                className="form-control" 
                                placeholder="Ingresá tu correo electrónico" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" className="btn btn-primary fw-bold px-4">
                                Buscar
                            </button>
                        </form>
                    </div>

                    {loading && (
                        <div className="d-flex justify-content-center mt-4">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                        </div>
                    )}

                    {!loading && searched && orders.length === 0 && (
                        <div className="alert alert-warning text-center shadow-sm" role="alert">
                            No encontramos compras asociadas al correo <strong>{email}</strong>.
                        </div>
                    )}

                    {!loading && orders.length > 0 && (
                        <div className="row g-4">
                            {orders.map(order => (
                                <div key={order.id} className="col-12">
                                    <div className="card shadow-sm border-0">
                                        <div className="card-header bg-light d-flex justify-content-between align-items-center">
                                            <span className="fw-bold text-muted">ID Orden: {order.id}</span>
                                            <span className="badge bg-success">Completada</span>
                                        </div>
                                        <div className="card-body">
                                            <p className="mb-1"><strong>Fecha:</strong> {order.date ? order.date.toDate().toLocaleDateString() : 'N/A'}</p>
                                            <p className="mb-1"><strong>Total pagado:</strong> <span className="text-primary fw-bold">${order.total}</span></p>
                                            
                                            <h6 className="mt-3 fw-bold">Productos:</h6>
                                            <ul className="list-group list-group-flush mt-2">
                                                {order.items.map(item => (
                                                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center bg-transparent px-0 border-light">
                                                        <span>{item.name}</span>
                                                        <span className="badge bg-secondary rounded-pill">{item.quantity} uds.</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyOrders;
