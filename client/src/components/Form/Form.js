import React, { useState, useEffect } from "react";
import { TextField, Typography, Button, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from 'react-file-base64';

import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  // if we have a currentId, then we loop over state.posts to .find the post p._id that has the same id as currentId:, otherwise return null
  const post = useSelector((state) => currentId ? state.posts.find((message) => message._id === currentId) : null);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    // if post exists, then we populate it's contents w/ the post variable from above
    // in doing so, we can then edit anything from the post & update it
    if (post) setPostData(post);
  }, [post]);
  
  const clear = () => {
    setCurrentId(0)
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //if we have a current id (id is not null)
    if (currentId) {
      dispatch(updatePost(currentId, postData)); // we need 2 parameters for this as per the routcontroller
    } else {
      dispatch(createPost(postData)); // if we don't have a currently selected id, it must mean that we're creating a post
    }
    clear()
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        {/* Have to spread the onChange handler since setPostData have more than 1 property to update, otherwise just e.target.value for 1 object property would sufice */}
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline 
          rows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
