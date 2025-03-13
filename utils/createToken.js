import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const payload = {
    id: user.id,
    fullname: user.fullname,
    email: user.email,
    phone: user.phone,
    role: user.role,
    gender: user.gender,
 };

  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export default generateToken;
