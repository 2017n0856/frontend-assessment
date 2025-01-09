import React, { createContext, useState, useContext, useEffect } from "react";
import { fetchFavoriteProjects } from "../api/projectApi";

const FavoriteContext = createContext();

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorite must be used within an FavoriteProvider");
  }
  return context;
};

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavoriteProjects()
      .then((data) => {
        setFavorites(data);
      })
      .catch((error) => {
        console.error("Error fetching fav projects:", error);
      });
  }, []);

  const updateFavorites = (updatedProject) => {
    setFavorites(
      favorites.map((fav) =>
        fav.id === updatedProject.id ? updatedProject : fav
      )
    );
  };

  return (
    <FavoriteContext.Provider value={{ favorites, updateFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
};
