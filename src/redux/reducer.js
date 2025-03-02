import {
  ADD_TO_FEED,
  INITIATE_DATA,
  SET_EXPLORE_USERS,
  STORE_USER_VALUE,
} from "./actionTypes";
import { initialState } from "./initialState";

export default function devConnectReducer(state = initialState, action) {
  if (action.type == STORE_USER_VALUE) {
    return { ...state, email: action.payload.email, uid: action.payload.uid };
  } else if (action.type == INITIATE_DATA) {

    return {
      ...state,
      email: action.payload.email,
      uid: action.payload.uid,
      following: action.payload.following,
      userName: action.payload.userName,
      
    };
  } else if (action.type == ADD_TO_FEED) {

    return { ...state, feedPosts: action.payload };
  } else if (action.type == SET_EXPLORE_USERS) {

    return { ...state, exploreUsers: action.payload };
  }

  return state;
}
