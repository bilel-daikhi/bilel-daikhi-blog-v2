import React, { useState } from "react"; 
import {useAuth} from "../hooks/auths";
import {formatDistanceToNow} from "date-fns"; 
import {useDeletePost, useToggleLike} from "../hooks/posts";
import {Link, Link as routerLink} from "react-router-dom";
import { useUser } from "../hooks/user"; 
import DOMPurify from "dompurify";
import { useCategories } from "../hooks/categories";
const SinglePost = ({post}) => {
  const {user, isLoading: authLoading} = useAuth();
 
  const {id, likes,comments,category, uid} = post;
 
  const isLiked = likes.includes(user?.id);
  const {toggleLike, isLoading} = useToggleLike({
    id,
    isLiked,
    uid: user?.id,
  });
  console.log('category: '+category);
  const {categories:selectedCategory, isLoading:isLoadingCategory} = useCategories(category);
  const {deletePost, isLoading: deleteLoading} = useDeletePost(post.id);
  const {user: users, isLoading: userLoading} = useUser(post.uid);
  
  return (
    <div class="entry bf-gallery clearfix">
     <div class="entry-title">
      <h2><Link  textDecoration='none'
            _hover={{textDecoration: "none"}}
            as={routerLink}
            to={`/posts/${post?.id}`}>{post.title}</Link></h2>
    </div>
    <ul class="entry-meta clearfix">
      <li><i className="fa-regular fa-calendar"></i> {formatDistanceToNow(post.date)} ago</li>
      <li><strong><i className="fa-solid fa-user"></i> Bilel Daikhi</strong></li>
      <li><strong><i className="fa-solid fa-tag"></i> {!isLoadingCategory && selectedCategory[0].name}</strong></li>
      <li><strong><i className="fa-regular fa-comment"></i> {post.comments ? post.comments?.length : 0} Comments</strong></li>
       <li><Link onClick={toggleLike} size='md' isLoading={authLoading || isLoading}>
       {isLiked ? <i className="fa-regular fa-heart mr-1"></i>: <i className="fa-solid fa-heart mr-1"></i> }  
       {post.likes.length} Likes </Link></li>
      {!authLoading && user?.id === post.uid && (
             <li> 
             <Link onClick={deletePost}><i class="fa-regular fa-trash-can color-danger"></i></Link>
               </li>
            )}
    </ul>
    <div class="entry-content">
   { post.blocks[0].type === "text" && 
                <div
                  key={post.blocks[0].id}
                  className="prose mb-4"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.blocks[0].content.substring(0, 100)) }}
                />}
    
      {DOMPurify.sanitize(post.blocks[0].content).length > 100 && <Link  textDecoration='none'
            _hover={{textDecoration: "none"}}
            as={routerLink}
            to={`/posts/${post?.id}`} className="more-link">Read More</Link>}
    </div>
  </div>


  );
};

export default SinglePost;
