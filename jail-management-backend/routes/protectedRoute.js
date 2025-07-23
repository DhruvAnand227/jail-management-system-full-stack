const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const SECRET_KEY = "secret";

router.post('/', async (req, res) => {
    const { password } = req.body

    if (password === "admin") {
        const token = jwt.sign({ role: "admin" }, SECRET_KEY, { expiresIn: "1h" });
        return res.json({ token: token });
    }
    return res.status(401).json({ message: "Wrong password" });;
})

function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Token not provided" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        next();
    }
    catch {
        return res.status(403).json({ message: "Invalid or expired token" });
    }

}

router.get('/login', verifyToken, async (req, res) => {
    res.send("Welcome to the application");
})


module.exports = router;