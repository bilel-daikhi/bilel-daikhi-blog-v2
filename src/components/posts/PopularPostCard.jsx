import React from 'react'; 
import { Link } from 'react-router-dom';
import { useComments } from '../../hooks/comments';

const PopularPostCard = ({ post }) => {
      const {comments, isLoading} = useComments(post.id);
    return (
        <div className="entry-c">
        <div className="entry-title">
          <h4>
            <Link to={`/posts/${post?.id}`}>
            {post.title.length > 50 ? `${post.title.substring(0, 50)} ...` : post.title}
            </Link>
            
          </h4>
        </div>
        <ul className="entry-meta">
          <li>
            <i className="icon-comments-alt"></i> {!isLoading ? (comments?.length) : '0'} Comments
          </li>
          <li>
            <i className="icon-comments-alt"></i> {post.likes ? (post.likes?.length) : '0'} Likes
          </li>
        </ul>
      </div>
    );
};

 

export default PopularPostCard; 