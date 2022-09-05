
import React , { useEffect }  from 'react';
import { Paper , Typography ,  CircularProgress , Divider } from '@material-ui/core';
import { useDispatch , useSelector } from 'react-redux';
import moment from 'moment';
import { useParams , useNavigate } from 'react-router-dom';
//import { getPost } from '../../../../server/controllers/posts';
import { getPost , getPostsBySearch } from '../actions/posts';
import CommentSection from './CommentSection';


const PostOne = () => {




  const {post ,  posts ,  currentPage  , isLoading } = useSelector((state) => state.posts)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {id} = useParams();

console.log(post);

    useEffect(() => {
        if (post) {
    dispatch(getPostsBySearch({search : "none" , tags : post?.tags.join(",")}))
        }



    } , [post])



    useEffect(() => {

        dispatch(getPost(id))

    } , [id])




//const recommendedPosts =  posts !== undefined ? posts.filter(( e ) => e._id !== post._id) : null

console.log(posts);


if (!post) return null
if (!posts) return null

if (isLoading) {

return (
<Paper>
<CircularProgress   size = "7em" />
</Paper>
)

}


const recommendedPosts =  posts.filter(( e ) => e._id !== post._id)



const openPost = (id) => {
    navigate(`/posts/${id}`)

}




return (

<div>



{post &&   <Paper>


<div>
 <div>

 <Typography  variant='h3' component= "h2">{post.title}</Typography>


 <Typography  gutterBottom  color='textSecondary'  variant='body1' component= "p">{post.message}</Typography>


<Typography  variant='h6' > Create by : {post.name}</Typography>


<Divider  style={{margin : "20px 0"}} />

<Typography  variant='body1' > <strong> RealTime Chat Coming Soon  </strong>  </Typography>

<Divider  style={{margin : "20px 0"}} />

<Typography  variant='body1' > <strong> <CommentSection  post = {post} /> </strong>  </Typography>




<Divider  style={{margin : "20px 0"}} />



 </div>

</div>

{
recommendedPosts.length > 1 &&  (
<div>

  <Typography  gutterBottom  variant='h5'>  YOU MIGHT ALSO LIKE  </Typography>

<Divider  />

<div>

  {
    recommendedPosts   &&  recommendedPosts.map(({title , message , name , likes , selectedFile , _id}) => (
<div  style={{margin : "20px" ,  cursor : "pointer" }}   onClick = {() => openPost(_id )}    key = {_id} >
   <Typography  gutterBottom variant='h6'> {title} </Typography>
   <Typography  gutterBottom variant='subtitle2'> {name} </Typography>
   <Typography  gutterBottom variant='subtitle2'> {message} </Typography>
   <Typography  gutterBottom variant='subtitle1'> Likes : {likes.length} </Typography>
    </div>
    ))
   }

</div>


</div>
)





}

 </Paper>

}
</div>











)
}

export default PostOne