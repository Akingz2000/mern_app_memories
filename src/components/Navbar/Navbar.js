import React , {useState , useEffect} from 'react'
import { Container, AppBar, Typography, Toolbar, Avatar  , Button  , TextField } from '@material-ui/core';
import memories from '../../images/memories.png';

import useStyles from './style';
import {Link , useNavigate , useLocation} from 'react-router-dom';
import {  useDispatch } from 'react-redux';
import decode from "jwt-decode";



const Navbar = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user , setUser] =  useState(JSON.parse(window.localStorage.getItem("profile")))

//const user = null;

const logOut = () => {

    dispatch({type: "LOGOUT"})
    setUser(null)
    navigate('/auth')


}

useEffect(() => {

    const token = user?.token;

    setUser(JSON.parse(window.localStorage.getItem("profile")))
    console.log("seyi is a boy" , user);

    if (token) {
        const decodedToken = decode(token)

        if (decodedToken.exp * 1000  < new Date().getTime())   logOut()


    }



} , [])


console.log(localStorage.getItem("profile"));

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">

    <div   >


    <Typography  component={Link} to = '/' className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />



    </div>

    <Toolbar>


{
  user ? (
    <div style = {{display : "flex"}} >
      <Avatar  alt = {user.result.name} style = {{color : "black"}}  >  </Avatar>

    <Typography  variant = 'h6'    > {user.result.name} </Typography>
    <Button variant='contained'    color = 'secondary'  onClick={logOut}  > Logout  </Button>

          </div>
        )   :  (

        <div>

            <Button  component = {Link}  to = '/auth' variant='contained' color = 'primary' > Sign in </Button>


        </div>

    )











}


    </Toolbar>




      </AppBar>
  )
}

export default Navbar