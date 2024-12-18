import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import cors from "cors"; // Import CORS

dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(cors());

const port = 3000;

// PostgreSQL connection setup
const { Pool } = pg;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// API Endpoint to get data
app.get("/api/tasks", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM tasks");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
