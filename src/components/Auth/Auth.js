import React , {useState} from 'react';
import { Avatar , Button , Paper , Grid , Typography , Container, TextField } from '@material-ui/core';
import {useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from './Input';

import {signup , signin} from "../../actions/auth"


//import useStyles from  './styles'

const initialState = {
  firstName : '',
  lastName : '',
  email : '',
password : '',
confirmPassword : ''



}


const Auth = () => {

    const state = null;

    const handleShowPassword = () => setShowPassword((prevShowPassword)  =>  !prevShowPassword  )

    const [showPassword , setShowPassword] = useState(false)
    const [isSignup , setisSignup] = useState(false)
    const [formData , setFormData] = useState(initialState)
const navigate = useNavigate();
const dispatch = useDispatch();

   // const isSignup = true;

    const handleSubmit = (e) => {
      e.preventDefault();


      if (isSignup) {

        dispatch(signup(formData , navigate))

      } else {
        dispatch(signin(formData , navigate))
      }





    }

    const handleChange = (e) => {

       setFormData({...formData ,  [e.target.name] : e.target.value })

    }

    const switchMode = () => {

      setisSignup((previsSignup)  =>  !previsSignup  )
      setShowPassword(false)

    }


  return (
    <Container component= "main"  maxWidth = "xs">

    <Paper  elevation={3}>

       <Avatar>

    <LockOutlinedIcon />

       </Avatar>

       <Typography  variant='h5'>  {isSignup ? "Sign Up" : "Sign In"}  </Typography>
       <form  onSubmit={handleSubmit}  >

      <Grid  spacing = {2} container >

       {
       isSignup  &&  (

        <>

        <Input    name = 'firstName'  label = 'First Name'  handleChange = {handleChange}  autoFocus  half   />


        <Input    name = 'lastName'  label = 'Last Name'  handleChange = {handleChange}    half  />

        </>

       )

       }

    <Input  name = 'email' label =  "Email Address"   handleChange = {handleChange}  type = 'email' />
    <Input   name = "password" label = "Password"  handleChange = {handleChange}  type = {showPassword ? "text" : "password"   }  handleShowPassword = {handleShowPassword}     />


      {isSignup   && <Input  name = "confirmPassword"  label = "Repeat Password"   type = "password"  handleChange = {handleChange}    />   }

      </Grid>

      <Button type = "submit"  fullWidth    variant = "contained"  color = "primary"    >  {isSignup ? "Sign up" : "Sign In"}   </Button>

      <Grid container  justify = "flex-end"   >

      <Grid   item >

    <Button  onClick=  {switchMode} >

    {
      isSignup ? "Already have an account ? Sign in" : "Don't have an account ? Sign up"



    }  </Button>

      </Grid>



      </Grid>


       </form>

    </Paper>

        </Container>
  )
}

export default Auth