export const getFavorites = async (req, res, next) => {
  try {
    return res.status(501).json({ message: 'Listado de favoritos aún no implementado.' });
  } catch (error) {
    next(error);
  }
};

export const addFavorite = async (req, res, next) => {
  try {
    return res.status(501).json({ message: 'Agregar favorito aún no implementado.' });
  } catch (error) {
    next(error);
  }
};

export const removeFavorite = async (req, res, next) => {
  try {
    return res.status(501).json({ message: 'Eliminar favorito aún no implementado.' });
  } catch (error) {
    next(error);
  }
};
