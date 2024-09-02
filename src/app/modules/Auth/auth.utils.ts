import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const isPasswordMatched = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  const isMatched = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatched;
};

export const createToken = (
  jwtPayload: { email: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
