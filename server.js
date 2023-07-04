require("dotenv/config");

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api", todoRoutes);

app.listen(port, () => {
    const webLink = "http://localhost:" + port;
    console.log(`Auth server listening on port ${port}. Ctrl + click to open the link: ${webLink}`)
});