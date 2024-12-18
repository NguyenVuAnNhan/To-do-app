import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import cors from "cors"; // Import CORS

dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

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

// API Endpoint to add new task
app.post("/api/tasks", async (req, res) => {
    let new_task = req.body;
    try {
        const result = await pool.query("INSERT INTO tasks (id, content, completed) VALUES ($1, $2, $3)",
            [new_task.id, new_task.content, new_task.done]);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// API Endpoint to remove a task

// API Endpoint to update a task

// API Endpoint to remove all completed tasks

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
