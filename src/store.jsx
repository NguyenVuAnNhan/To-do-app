import tasksReducer from "./tasksReducer.jsx";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        tasks: tasksReducer, // Tasks reducer is now part of the 'tasks' slice
    },
});

export default store