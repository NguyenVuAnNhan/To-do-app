let example_selected = "all"

const selectReducer = (selected = example_selected, action) => {
    switch (action.type) {
        case 'all': {
            return "all";
        }
        case 'select completed': {
            return "completed";
        }
        case 'not completed': {
            return "not completed";
        }
        default: {
            return selected;
        }
    }
}

export default selectReducer