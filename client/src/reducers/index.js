import { combineReducers } from "redux";

import posts from "./posts";

//the names in combineReducers'll be used inside useSelector state.posts
export const reducers = combineReducers({
  posts,
});
