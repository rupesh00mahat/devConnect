import { INITIATE_DATA, STORE_USER_VALUE } from "./actionTypes";
import { initialState } from "./initialState";

export default function devConnectReducer(state = initialState, action) {
  if(action.type == STORE_USER_VALUE){
    return {...state, email: action.payload.email, uid: action.payload.uid};
  }
  if(action.type == INITIATE_DATA){
    return {...state, email: action.payload.email, uid: action.payload.uid, firstName: action.payload.firstName, following: action.payload.following}
  }
  return state;
}
