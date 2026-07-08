import { createContext, useState, useEffect } from 'react';
import { db } from '../services/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Recuperar usuario de localStorage si existe (para mantener la sesión viva)
        const storedUser = localStorage.getItem('coderstore-user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setUserData(parsedUser);
        }
        setLoading(false);
    }, []);

    const registerUser = async (email, password, nombre, apellido, dni, telefono) => {
        try {
            // Usamos el email como ID del documento para que no hayan duplicados
            const docRef = doc(db, 'usuarios', email);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                throw new Error("El correo ya está registrado.");
            }

            const newUserData = {
                nombre,
                apellido,
                dni,
                telefono,
                email,
                password // En texto plano por pedido del curso
            };

            await setDoc(docRef, newUserData);

            // Iniciar sesión automáticamente
            setUser(newUserData);
            setUserData(newUserData);
            localStorage.setItem('coderstore-user', JSON.stringify(newUserData));

            return newUserData;
        } catch (error) {
            console.error("Error en registro:", error);
            throw error;
        }
    };

    const loginUser = async (email, password) => {
        try {
            const docRef = doc(db, 'usuarios', email);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                throw new Error("No existe una cuenta con este correo.");
            }

            const data = docSnap.data();

            if (data.password !== password) {
                throw new Error("Contraseña incorrecta.");
            }

            // Inicio de sesión exitoso
            setUser(data);
            setUserData(data);
            localStorage.setItem('coderstore-user', JSON.stringify(data));

            return data;
        } catch (error) {
            console.error("Error en login:", error);
            throw error;
        }
    };

    const logoutUser = () => {
        setUser(null);
        setUserData(null);
        localStorage.removeItem('coderstore-user');
    };

    return (
        <AuthContext.Provider value={{ user, userData, registerUser, loginUser, logoutUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
