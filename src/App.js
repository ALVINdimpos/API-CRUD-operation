import * as React from 'react';

import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from "react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [postsEdit, setPostsEdit] = useState("");
  const [input, setInput]= useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const apiEndPoint = "http://localhost:4000/posts";
  useEffect(() => {
    const getPosts = async () => {
      const { data: res } = await axios.get(apiEndPoint);
      setPosts(res);
    };
    getPosts()
  }, []);

  const addPost = async (e) => {
    const post = { title:input, body: "new" };
    await axios.post(apiEndPoint, post);
    setPosts([post, ...posts]);
    e.preventDefault();
  };

  const handleUpdate = async (post) => {
    setOpen(true)
    
    // console.log(post);
    // await axios.put(apiEndPoint + "/" + post.id);
    // const postsClone = [...posts];
    // const index = postsClone.indexOf(post);
    // postsClone[index] = { ...post };
    setPostsEdit(post.title);
    console.log(postsEdit)
  };

  const handleDelete = async (post) => {
    await axios.delete(apiEndPoint + "/" + post);
    setPosts(posts.filter((p) => p.id !== post));
  };

  // if (posts.length = 0) return <h2> there are no post in the Database </h2>;
  function inputHandler(e){
   
    setInput(e.target.value);
    

  }
  return (
    <>
      <div className="container">
        <h2> there are {posts.length} post in the Database </h2>
        <input type="text" placeholder="Enter post" onChange={inputHandler} />
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Update your Todo
          </Typography>
          <TextField
            hiddenLabel
            id="filled-hidden-label-normal"
            Value= {postsEdit}
            variant="filled"
          />
        </Box>
      </Modal>
        <button onClick={addPost} className="btn btn-primary btn-sm">
          Add Post
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post,idx) => (
              <tr key={idx}>
                <td> {post.title} </td>
                <td>
                  <button
                    onClick={() => handleUpdate(post)}
                    className="btn btn-info btn-sm"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
