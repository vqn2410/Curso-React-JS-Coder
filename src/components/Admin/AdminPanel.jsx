import { useState, useEffect } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';

const AdminPanel = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const q = query(collection(db, 'ordenes'));
                const querySnapshot = await getDocs(q);
                
                const fetchedOrders = [];
                querySnapshot.forEach((doc) => {
                    fetchedOrders.push({ id: doc.id, ...doc.data() });
                });
                
                fetchedOrders.sort((a, b) => b.date?.toMillis() - a.date?.toMillis());
                
                setOrders(fetchedOrders);
            } catch (error) {
                console.error("Error al obtener las órdenes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return (
        <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando panel...</span>
            </div>
        </div>
    );

    return (
        <div className="container mt-5 mb-5">
            <h2 className="fw-bold mb-4">Panel de Administración de Ventas</h2>
            
            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0 align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>Fecha</th>
                                    <th>ID Orden</th>
                                    <th>Comprador</th>
                                    <th>Contacto</th>
                                    <th>Total</th>
                                    <th>Productos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4">No hay ventas registradas aún.</td>
                                    </tr>
                                ) : (
                                    orders.map(order => (
                                        <tr key={order.id}>
                                            <td>{order.date ? order.date.toDate().toLocaleDateString() : 'N/A'}</td>
                                            <td><span className="badge bg-secondary">{order.id}</span></td>
                                            <td className="fw-semibold">{order.buyer?.nombre}</td>
                                            <td>
                                                <small className="d-block">{order.buyer?.email}</small>
                                                <small className="text-muted">{order.buyer?.telefono}</small>
                                            </td>
                                            <td className="fw-bold text-success">${order.total}</td>
                                            <td>
                                                <ul className="list-unstyled mb-0 small">
                                                    {order.items?.map(item => (
                                                        <li key={item.id}>• {item.name} (x{item.quantity})</li>
                                                    ))}
                                                </ul>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
