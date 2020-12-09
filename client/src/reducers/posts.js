import { CREATE,
  UPDATE,
  LIKE,
  DELETE,
  FETCH_ALL } from '../constants/actionTypes'

//state'll always be the posts,so you can name it whatever you want
// eslint-disable-next-line import/no-anonymous-default-export
export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...posts, action.payload];
    case UPDATE:
    case LIKE:
      //We can remove the  LIKE case under UPDATE since they both do the same thing, but I keep it for readability
      //action.payload is the newly updated post from memory
      return posts.map(post => post._id === action.payload._id ? action.payload : post)
    case DELETE:
      // we keep all the posts, except the one that matches the id from the action.payload
      return posts.filter(post => post._id !== action.payload);
    default:
      return posts;
  }
};