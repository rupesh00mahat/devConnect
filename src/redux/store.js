import { applyMiddleware, compose, createStore } from "redux";
import devConnectReducer from "./reducer";
import { thunk } from "redux-thunk";
import { devToolsEnhancer } from "@redux-devtools/extension";

const middlewareEnhancer = applyMiddleware(thunk);
const composedEnhancers = compose(middlewareEnhancer, devToolsEnhancer());
 const store = createStore(devConnectReducer, composedEnhancers);
export default store;