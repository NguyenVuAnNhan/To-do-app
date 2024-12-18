let example_selected = "all"

const selectReducer = (selected = example_selected, action) => {
    switch (action.type) {
        case 'all': {
            return "all";
        }
        case 'completed': {
            return "completed";
        }
        case 'not completed': {
            return "not completed";
        }
        default: {
            return "all";
        }
    }
}

export default selectReducer