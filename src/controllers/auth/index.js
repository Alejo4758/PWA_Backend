export const register = async (req, res, next) => {
  try {
    return res.status(501).json({ message: 'Registro aún no implementado.' });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    return res.status(501).json({ message: 'Login aún no implementado.' });
  } catch (error) {
    next(error);
  }
};
