import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET environment variable");
}

export const signToken = (payload: { _id: string }): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string): { _id: string } | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as { _id: string };
  } catch (error) {
    return null;
  }
};
