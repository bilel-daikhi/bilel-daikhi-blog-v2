import React from 'react';
import { Link } from 'react-router-dom';
import { useToggleLike } from '../../hooks/posts'; 

const Likes = ({post,user,fetchPost}) => {
 
     const isLiked=post.likes?.includes(user?.id);

 
    const {toggleLike, isLikeLoading} = useToggleLike({
        id: post.id,
        isLiked: isLiked,
        uid: user.id,
        onSuccess: fetchPost  
    });
    if (isLikeLoading) return <div>Like post...</div>;

    return (
       
         <Link 
                                           onClick={toggleLike}
                                           disabled={user && isLikeLoading}
                                            
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