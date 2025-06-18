import jwt from "jsonwebtoken";

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return { valid: true, decoded };
  } catch (err) {
    return { valid: false, decoded: null };
  }
}

export function requireRole(decoded: any, role: string): boolean {
  return decoded?.role === role;
}
