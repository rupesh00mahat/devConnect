import {
  COMMENT_POST,
  CREATE_POST,
  INITIATE_DATA,
  LIKE_POST,
  LOAD_FEED,
  REPLY_TO_COMMENT,
  SHARE_POST,
  STORE_USER_VALUE,
} from "./actionTypes";

export const storeUserValue = (value) => ({
  type: STORE_USER_VALUE,
  payload: value,
});
export const initiateData = (value) => ({
  type: INITIATE_DATA,
  payload: value,
});
export const loadFeed = (value) => ({
  type: LOAD_FEED,
  payload: value,
});

export const createPost = (value) => ({
  type: CREATE_POST,
  payload: value,
});

export const likePost = (value) => ({
  type: LIKE_POST,
  payload: value,
});

export const commentPost = (value) => ({
  type: COMMENT_POST,
  payload: value,
});

export const sharePost = (value) => ({
  type: SHARE_POST,
  payload: value,
});
export const replyToComment = (value) => ({
  type: REPLY_TO_COMMENT,
  payload: value,
});
