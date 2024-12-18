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
    console.log("are you here?")
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
    console.log("are you here?")
    try {
        const result = await pool.query("INSERT INTO tasks (id, content, completed) VALUES ($1, $2, $3)",
            [new_task.id, new_task.content, new_task.done]);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// API Endpoint to remove all completed tasks
app.delete("/api/tasks/completed", async(req, res) => {
    console.log("working here my man")
    try {
        console.log("working here")
        const result = await pool.query("DELETE FROM tasks WHERE completed = TRUE");
        console.log("no error")
    } catch (err) {
        res.status(500).send("Server error");
    }
});

// API Endpoint to remove a task
app.delete("/api/tasks/:id", async (req, res) => {
    let old_task = req.params['id'];
    try {
        const result = await pool.query("DELETE FROM tasks WHERE id = ($1)", [old_task]);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// API Endpoint to update a task
app.put("/api/tasks", async (req, res) => {
    let new_task = req.body;
    console.log(new_task);
    try {
        const result = await pool.query("UPDATE tasks SET content = ($2), completed = ($3) WHERE id = ($1)",
            [new_task.id, new_task.content, new_task.done]);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
