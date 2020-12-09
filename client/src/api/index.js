import axios from "axios";

// this url was used for development locally
// const url = "http://localhost:8000/posts";

// using this url after deploying the server to heroku:
const url = 'https://memories-project-rb.herokuapp.com/posts';// you can still use localhost:3000 with this url

//returns all the posts we currently have in the database
export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);

// we can first create the route w/ its controller & then we can come here to make the api call & after move on to like action creator, etc.