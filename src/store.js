import {createStore} from "redux";
import reducer from './reducer.js';

export default function configureStore(
    initialState = {
        pageDataSize: 5,
    }
) {
    return createStore(reducer, initialState);
}