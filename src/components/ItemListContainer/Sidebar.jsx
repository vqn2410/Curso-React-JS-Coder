import { NavLink } from 'react-router-dom';

const Sidebar = ({ maxPrice, setMaxPrice }) => {
    return (
        <aside className="card shadow-sm border-0 sticky-top" style={{ top: '80px', zIndex: 1 }}>
            <div className="card-body">
                <h5 className="card-title mb-3 fw-bold border-bottom pb-2">Categorías</h5>
                <div className="list-group list-group-flush mb-4">
                    <NavLink to={`/category/celulares`} className={({ isActive }) => `list-group-item list-group-item-action border-0 rounded ${isActive ? 'active bg-primary text-white fw-bold' : ''}`}>📱 Celulares</NavLink>
                    <NavLink to={`/category/laptops`} className={({ isActive }) => `list-group-item list-group-item-action border-0 rounded ${isActive ? 'active bg-primary text-white fw-bold' : ''}`}>💻 Laptops</NavLink>
                    <NavLink to={`/category/tablets`} className={({ isActive }) => `list-group-item list-group-item-action border-0 rounded ${isActive ? 'active bg-primary text-white fw-bold' : ''}`}>📱 Tablets</NavLink>
                </div>

                <h5 className="card-title mb-3 fw-bold border-bottom pb-2">Filtros</h5>
                <div className="mb-3">
                    <label className="form-label fw-semibold text-secondary">Precio Máximo: <span className="text-dark">${maxPrice}</span></label>
                    <input 
                        type="range" 
                        min="100" 
                        max="2000" 
                        step="50" 
                        value={maxPrice} 
                        onChange={(e) => setMaxPrice(Number(e.target.value))} 
                        className="form-range"
                    />
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
