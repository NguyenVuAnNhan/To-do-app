import rootReducer from "./rootReducer.jsx";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        root: rootReducer, // Tasks reducer is now part of the 'tasks' slice
    },
});

export default store