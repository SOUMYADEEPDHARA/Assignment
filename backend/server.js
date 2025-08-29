const express = require ('express');

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("<h1>Server running on 3000</h1>");
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});