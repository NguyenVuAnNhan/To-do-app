import { all, takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

function* fetchData(action) {
    console.log('fetchData triggered');
    try {
        const response = yield call(axios.get, 'http://localhost:3000/api/tasks');
        yield put({ type: 'set', data: response.data });
    } catch (error) {
        yield put({ type: 'FETCH_DATA_FAILURE', error: error.message });
    }
}

function* watchFetchData() {
    console.log('Watcher is active');
    yield takeLatest('FETCH_DATA', fetchData);  // This should listen for the action type
}

// Middleware for adding task

function* addData(action){
    try {
        let data = {
            id: action.id,
            content: action.content,
            done: false
        };
        console.log(data);
        const response = yield call(axios.post, 'http://localhost:3000/api/tasks', data)
        console.log(response);

    } catch (error){
        yield put({ type: 'ADD_DATA_FAILURE', error: error.message });
    }
}

function* watchAddData(){
    yield takeLatest('added', addData);
}

// Middleware for removing completed tasks

// Middleware for updating tasks
function* updateTask(action){
    try {
        let data = {
            id: action.task.id,
            content: action.task.content,
            done: action.task.completed
        };
        console.log(data);
        const response = yield call(axios.put, 'http://localhost:3000/api/tasks', data);
        console.log(response);

    } catch (error){
        yield put({ type: 'ADD_DATA_FAILURE', error: error.message });
    }
}

function* watchUpdateTask(){
    console.log("watcher activated");
    yield takeLatest('edited', updateTask);
}

// Middleware for removing a task
function* removeTask(action){
    try {
        const response = yield call(axios.delete, 'http://localhost:3000/api/tasks/' + action.id.toString())
        console.log(response);

    } catch (error){
        yield put({ type: 'ADD_DATA_FAILURE', error: error.message });
    }
}

function* watchRemoveTask(){
    yield takeLatest('removed', removeTask);
}



export default function* rootSaga() {
    console.log("rootSaga triggered")
    yield all([watchFetchData(), watchAddData(), watchRemoveTask(), watchUpdateTask()]);  // Run watcher sagas
}
