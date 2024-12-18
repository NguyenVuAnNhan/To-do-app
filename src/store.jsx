import rootReducer from "./rootReducer.jsx";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./sagas.jsx";


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        root: rootReducer, // Tasks reducer is now part of the 'tasks' slice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga)

export default store