export function requireJson(req, res, next) {
  if ((req.method === "POST" || req.method === "PUT") &&
      req.headers["content-type"] !== "application/json") {
    return res.status(400).json({
      error: "Missing Content-Type: application/json header"
    });
  }
  next();
}
