
import {  useComments } from "../hooks/comments";
import SingleComment from "../components/comments/SingleComment";
import NewComment from "../components/comments/NewComment";

export function ListComments({postId}) {
    const {comments, isLoading} = useComments();
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

                    <h3 id="comments-title"><span>{comments ?comments.length : 0}</span> Comments</h3>

                     <ol className="commentlist clearfix">
                {comments.map(comment =>   <SingleComment comment={comment} />)}
                  

                 
                    </ol>

                    <div className="clear"></div>

                 <NewComment/>

                  </div>
    
);
    
}