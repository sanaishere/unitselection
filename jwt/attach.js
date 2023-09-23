
const jwt=require('jsonwebtoken')
//const cookie=require('cookie')
const tokenuser=({user})=>{
    const token= {username:user.username?user.username:user.stnumber,userID:user._id,role:user.role}
    return token

}
const createjwt=({token})=>{
  return jwt.sign(token,'JWTSECRET',{expiresIn:'30d'})
}

const isTokenValid = ({ token }) => jwt.verify(token, 'JWTSECRET');

const attachcookie=({res,create})=>{
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', create, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    signed:true,
    secure: process.env.NODE_ENV === 'production',
   // signed: true,
  });
};
    

module.exports={tokenuser,createjwt,isTokenValid,attachcookie}