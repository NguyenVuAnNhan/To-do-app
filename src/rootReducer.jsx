import {combineReducers} from "redux";
import selectReducer from "./selectReducer.jsx";
import tasksReducer from "./tasksReducer.jsx";

// Combine the reducers into one rootReducer
const rootReducer = combineReducers({
    tasks: tasksReducer,
    selected: selectReducer,
});

export default rootReducer;