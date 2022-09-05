import React , {useState , useEffect , useRef} from 'react';
import { Typography , TextField , Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import {commentPost} from "../actions/posts"






const CommentSection = ({post}) => {

  const [comments , setComments] = useState(post?.comments)
  const [comment , setComment] = useState("")
  const dispatch = useDispatch();
  const user = JSON.parse(  localStorage.getItem("profile"))
  const commentsRef = useRef(null)

  const handleClick =  async () => {

    const finalComment = `${user.result.name} : ${comment}`

 const newComments =  await  dispatch(commentPost(finalComment , post._id))

 setComments(newComments)
 setComment("")

 commentsRef.current.scrollIntoView({behavior : "smooth"})

  }



  return (
    <div>

        <div>
            <div>
                <Typography  gutterBottom  variant='h6'>

                    Comments
                </Typography>

                {
                    comments.map((c , i) => (

                        <Typography  key = {i}  variant = "subtitle1"  gutterBottom>

{c}

                        </Typography>



                    ))





                }
                <div  ref = {commentsRef} />

</div>

                {
user?.result?.name && (


                <div  style={{width : "70%" }} >

                <Typography  gutterBottom  variant='h6'>

Write A Comments
</Typography>

<TextField
  fullWidth
  rows = {4}
  variant = "outlined"
  label = "Comments"
  multiline
  value = {comment}
  onChange = { (e) =>  setComment(e.target.value)}




/>

<Button  style={{marginTop : "10px"}}
fullWidth
color = "primary"
disabled = {!comment}
variant = "contained"
onClick={handleClick}
>   Comment  </Button>


                </div>



)
}
        </div>



    </div>
  )
}

export default CommentSection