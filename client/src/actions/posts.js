import { CREATE, UPDATE, LIKE, DELETE, FETCH_ALL } from "../constants/actionTypes";
import * as api from "../api"; // this import * as api means we'll be able to access it via api.whatever

//action creators
//since this is asynchronous, we have to use redux-thunk, so we have to modify the syntax for this
export const getPosts = () => async (dispatch) => {
  //with redux-thunk, instead of returning the action, you have to dispatch the action:
  try {
    //we first get the response from the api & we destructure it & get 'data':
    const { data } = await api.fetchPosts();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    //this gives more info instead of of error.message
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
    // console.log(data)
  } catch (error) {
    //this gives more info instead of of error.message
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    //this gives more info instead of of error.message
    console.log(error);
  }
};
