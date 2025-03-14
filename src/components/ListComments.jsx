
import {  useComments } from "../hooks/comments";
import CommentCard from "./comments/CommentCard";
import NewComment from "../components/comments/NewComment";

export function ListComments({postId}) {
    const {comments, isLoading} = useComments(postId);
    // const {user, isLoading: userLoading} = useUser();
    if (isLoading)
      return (
        <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ color: "#1700ff" }}
      >
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      );
   
    return (
  <div id="comments" className="clearfix">

                    <h3 id="comments-title"><span>{comments ?comments.length : 0}</span> Comment(s)</h3>

                     <ol className="commentlist clearfix">
                {comments && comments.map((comment,index) =>   <CommentCard key={index} comment={comment} />)}
                  

                 
                    </ol>

                    <div className="clear"></div>

                 <NewComment postId={postId}/>

                  </div>
    
);
    
}