import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid , Paper, TextField, Button} from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { getPosts , getPostsBySearch } from '../../actions/posts';
import Navbar from '../Navbar/Navbar';
import Paginatate from '../Pagination';
import ChipInput from "material-ui-chip-input";
import { useLocation, useNavigate } from 'react-router-dom';

function useQuery() {
return  new  URLSearchParams(useLocation().search)
}


const Home = () => {

    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const query = useQuery()

   const navigate = useNavigate()
   const  page = query.get("page")  ||  1;
   const  searchQuery = query.get("searchQuery")  ||  1;
   const [search , setSearch] = useState("")
   const [tags , setTags] = useState([])

   /* useEffect(() => {
      dispatch(getPosts());
    }, [currentId, dispatch]);

   */
    const handleKeyPress = (e) => {

      if (e.keyCode === 13) {
    searchPost()
      }


    }

    const handleAdd = (tag) => {
      setTags([...tags , tag])
    }

    const handleDelete   = (tagToDelete) => {

setTags(tags.filter((tag) => tag !== tagToDelete))

    }

    const searchPost = () => {
  if (search.trim() || tags ) {
dispatch(getPostsBySearch({search , tags : tags.join(",")}))
navigate(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`)
  }
    }



  return (
    <Grow in>

    <Container  maxWidth = "xl">
    <Navbar />
      <Grid container justify="space-between" alignItems="stretch" spacing={3}>
        <Grid item xs={12} sm={7}  md = {9}>
          <AppBar  style = {{marginBottom : "2rem"}}  position='static' color = "inherit">

<TextField   onKeyPress = {handleKeyPress}  name = "search"  variant='outlined'  label = "Search Memories"  fullWidth  value = {search}  onChange={(e) =>  setSearch(e.target.value) }  />
<ChipInput
style = {{margin : "1.6rem  0rem"}}  value = {tags}  variant = "outlined"  label = "Search Tags"  onAdd = {handleAdd}  onDelete={handleDelete} />
<Button   variant='contained' onClick={searchPost} color = "primary" >  Search </Button>
          </AppBar>
          <Posts setCurrentId={setCurrentId} />
        </Grid>
        <Grid item xs={12} sm={6}  md = {3}>
          <Form currentId={currentId} setCurrentId={setCurrentId} />


<Paper   elevation={6}  >


<Paginatate  page = {page} />


          </Paper>




        </Grid>
      </Grid>
    </Container>
  </Grow>
  )
}

export default Home