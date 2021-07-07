import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import userReducers from "./reducers/user-reducers";
import parkingReducers from "./reducers/parking-reducers";
const rootReducer = combineReducers({
	user: userReducers,
	parking: parkingReducers
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
