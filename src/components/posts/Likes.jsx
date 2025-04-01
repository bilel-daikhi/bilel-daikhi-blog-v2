import React from 'react';
import { Link } from 'react-router-dom';
import { useToggleLike } from '../../hooks/posts'; 
import { useAuth } from '../../hooks/auths';

const Likes = ({post,fetchPost}) => {
   const {user, isLoading: authLoading} = useAuth();
     const isLiked=post.likes?.includes(user?.id);
    console.log("isLiked: "+isLiked);
    console.log("post: "+JSON.stringify(post));
    const {toggleLike, isLikeLoading} = useToggleLike({
        id: post?.id,
        isLiked: isLiked,
        uid: user?.id,
        onSuccess: fetchPost  
    });
    if (isLikeLoading) return <div>Like post...</div>;

    return (
      <Link 
        onClick={user ? toggleLike : undefined}
        style={{ pointerEvents: user ? 'auto' : 'none' }}
      >
        {isLiked ? (
          <i className="fa-solid fa-heart mr-1 text-danger" />
        ) : (
          <i className="fa-regular fa-heart mr-1" />
        )}
        {post.likes?.length || 0} Likes
      </Link>
    );
};

export default Likes;