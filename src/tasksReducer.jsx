let example_tasklist = [{
    id:0,
    content:"debug",
    completed:false
}]

const tasksReducer = (tasks = example_tasklist, action) => {
    switch (action.type) {
        case 'added': {
            return [
                ...tasks,
                {
                    id: action.id,
                    content: action.content,
                    done: false,
                },
            ];
        }
        case 'edited': {
            console.log("edited dispatch")
            return tasks.map((t) => {
                if (t.id === action.task.id) {
                    return action.task;
                } else {
                    return t;
                }
            });
        }
        case 'removed': {
            return tasks.filter((t) => t.id !== action.id);
        }
        case 'completed': {
            return tasks.filter((t) => t.completed !== true);
        }
        case 'set': {
            return action.data;
        }
        default: {
            return tasks;
        }
    }
}

export default tasksReducer