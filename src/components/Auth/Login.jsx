import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await loginUser(email, password);
            navigate('/');
        } catch (err) {
            setError('Correo o contraseña incorrectos.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-5 col-lg-4">
                    <div className="card shadow-sm border-0 p-4 bg-white">
                        <h2 className="fw-bold mb-4 text-center">¡Hola! Ingresá tu e-mail</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label fw-semibold">E-mail</label>
                                <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-semibold">Contraseña</label>
                                <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            
                            <button type="submit" className="btn btn-primary w-100 fw-bold py-2" disabled={loading}>
                                {loading ? 'Ingresando...' : 'Continuar'}
                            </button>
                        </form>
                        
                        <div className="text-center mt-4">
                            <Link to="/registro" className="text-primary fw-semibold text-decoration-none">Crear cuenta</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
