import { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        const localData = localStorage.getItem('techstore-favorites');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('techstore-favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (item) => {
        if (!favorites.some(fav => fav.id === item.id)) {
            setFavorites(prev => [...prev, item]);
        }
    };

    const removeFavorite = (id) => {
        setFavorites(prev => prev.filter(item => item.id !== id));
    };

    const toggleFavorite = (item) => {
        if (isFavorite(item.id)) {
            removeFavorite(item.id);
        } else {
            addFavorite(item);
        }
    };

    const isFavorite = (id) => {
        return favorites.some(fav => fav.id === id);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
