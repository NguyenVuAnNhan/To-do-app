import {ALL, NOT_COMPLETED, SELECT_COMPLETED} from "./Items.jsx";

let example_selected = "all"

const selectReducer = (selected = example_selected, action) => {
    switch (action.type) {
        case ALL: {
            return "all";
        }
        case SELECT_COMPLETED: {
            return "completed";
        }
        case NOT_COMPLETED: {
            return "not completed";
        }
        default: {
            return selected;
        }
    }
}

export default selectReducer