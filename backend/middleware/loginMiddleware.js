import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "test_secret_key"; 

export function loginMiddleware(req, res, next) {
  const loginHeader = req.headers["authorization"];

  if (!loginHeader) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  const [scheme, token] = loginHeader.split(" ");
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Invalid Authorization header format" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    req.user = decoded;
    next();
  });
}
