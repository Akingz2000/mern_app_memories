import React , {useEffect , useState} from 'react';
import { Paper , Typography ,  CircularProgress , Divider } from '@material-ui/core';
import { useDispatch , useSelector } from 'react-redux';
import moment from 'moment';
import { useParams , useNavigate } from 'react-router-dom';
//import { getPost } from '../../../../server/controllers/posts';
import { getPost } from '../../actions/posts';



const PostDetails = () => {

  const {post , posts , isLoading } = useSelector((state) => state.posts)
console.log(post , isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {id} = useParams();
  console.log(id);

  useEffect(() => {
   console.log("seyi");
  }, [])


  return (

   post &&  <Paper>


   <div>
    <div>

    <Typography  variant='h3' component= "h2">{post.title}</Typography>



    </div>





   </div>

    </Paper>



  )
}

export default PostDetails