import { z } from "zod";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "change_this_dev_secret";

const loginSchema = z.object({
username: z.string().min(1),
password: z.string().min(1),
});

function issueToken(payload) {
return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

export const loginController = {
login: (req, res) => {const parse = loginSchema.safeParse(req.body);
    if (!parse.success) return res.status(400)  .json({ error: "Validation error", details: parse.error.flatten() });

    const { username, password } = parse.data;
    if (username !== "admin" || password !== "1234")
      return res.status(401).json({ error: "Invalid credentials" });

    const token = issueToken({ sub: username });
    res.json({ token });
  },
};
