import {
  legacy_createStore as creatStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import {products} from './reducer'

const initialState = {};
const middleWare = [thunk];
const reducers = combineReducers({products});
const store = creatStore(
  reducers,
  initialState,
  applyMiddleware(...middleWare)
);
export default store;
