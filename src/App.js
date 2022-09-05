import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { BrowserRouter , Route, Routes , Navigate } from "react-router-dom";


import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import PostOne from './components/PostOne';

const App = () => {
 // const [user , setUser] =  useState(localStorage.getItem("profile"))
//console.log(user);

const user = JSON.parse(localStorage.getItem("profile"))

  return (
    <BrowserRouter>

<Container maxWidth="xl">
{ /* localStorage.getItem("profile") !== null ? <div></div> : <Navbar />  */}

   <Routes>

    <Route  path = '/' element = { <Navigate  to = "/posts"  replace /> }   />
    <Route  path = '/posts' element = {<Home/>}   />
    <Route  path = '/posts/search' element = {<Home/>}   />
    <Route  path = '/posts/:id' element = {< PostOne/>}   />
    <Route  path = '/auth' element = { !user ?  <Auth /> : <Navigate  to = "/posts"  replace /> }   />
</Routes>




    </Container>


    </BrowserRouter>

  );
};

export default App;
