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

function* addData(action){
    try {
        const response = yield call(axios.post, '')
    } catch (error){
        yield put({ type: 'ADD_DATA_FAILURE', error: error.message });
    }
}

function* watchAddData(){
    yield takeLatest('added', addData);
}

export default function* rootSaga() {
    console.log("rootSaga triggered")
    yield all([watchFetchData()]);  // Run watcher sagas
}
