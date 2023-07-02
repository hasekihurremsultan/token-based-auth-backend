require("dotenv/config");

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const authRoutes = require("./routes/auth");

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use("/auth", authRoutes);

app.listen(port, () => {
    const webLink = "http://localhost:" + port;
    console.log(`Auth server listening on port ${port}. Ctrl + click to open the link: ${webLink}`)
});