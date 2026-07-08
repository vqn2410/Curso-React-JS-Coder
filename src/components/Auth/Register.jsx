import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const { registerUser } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        telefono: '',
        email: '',
        password: ''
    });
    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await registerUser(
                formData.email, 
                formData.password, 
                formData.nombre, 
                formData.apellido, 
                formData.dni, 
                formData.telefono
            );
            navigate('/'); // Redirigir al inicio tras registrarse
        } catch (err) {
            setError(err.message || 'Error al crear la cuenta. Verifica los datos.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-sm border-0 p-4 bg-white">
                        <h2 className="fw-bold mb-4 text-center">Crear Cuenta</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Nombre</label>
                                    <input type="text" name="nombre" className="form-control" onChange={handleChange} required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Apellido</label>
                                    <input type="text" name="apellido" className="form-control" onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-semibold">DNI</label>
                                <input type="number" name="dni" className="form-control" onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Teléfono</label>
                                <input type="tel" name="telefono" className="form-control" onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Correo Electrónico</label>
                                <input type="email" name="email" className="form-control" onChange={handleChange} required />
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-semibold">Contraseña</label>
                                <input type="password" name="password" className="form-control" minLength="6" onChange={handleChange} required />
                                <div className="form-text">Mínimo 6 caracteres.</div>
                            </div>
                            
                            <button type="submit" className="btn btn-primary w-100 fw-bold py-2" disabled={loading}>
                                {loading ? 'Creando cuenta...' : 'Registrarme'}
                            </button>
                        </form>
                        
                        <div className="text-center mt-3">
                            <span className="text-muted">¿Ya tenés cuenta? </span>
                            <Link to="/login" className="text-primary fw-semibold text-decoration-none">Iniciar Sesión</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
