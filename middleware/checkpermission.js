
const {tokenuser,createjwt,isTokenValid,attachcookie}=require('../jwt/attach')
const CustomError=require('../errors')
const authenticateUser = async (req, res, next) => {
    const token =req.signedCookies.token
  
    if (!token) {
      
      throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }
  
    try {
      const { username, userID, role } = isTokenValid({ token });
      req.user = { username, userID, role };
      next();
    } catch (error) {
      throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }
  };
  
  const authorizePermissions = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        throw new CustomError.UnauthorizedError(
          'Unauthorized to access this route'
        );
      }
      next();
    };
  };
  
  module.exports = {
    authenticateUser,
    authorizePermissions,
  };