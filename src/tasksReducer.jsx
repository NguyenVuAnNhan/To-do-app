let example_tasklist = [{
    id:0,
    content:"debug",
    completed:false
}]

const tasksReducer = (tasks = example_tasklist, action) => {
    switch (action.type) {
        case ADDED: {
            return [
                ...tasks,
                {
                    id: action.id,
                    content: action.content,
                    done: false,
                },
            ];
        }
        case EDITED: {
            console.log("edited dispatch")
            return tasks.map((t) => {
                if (t.id === action.task.id) {
                    return action.task;
                } else {
                    return t;
                }
            });
        }
        case REMOVED: {
            return tasks.filter((t) => t.id !== action.id);
        }
        case COMPLETED: {
            return tasks.filter((t) => t.completed !== true);
        }
        case SET: {
            return action.data;
        }
        default: {
            return tasks;
        }
    }
}

export default tasksReducer