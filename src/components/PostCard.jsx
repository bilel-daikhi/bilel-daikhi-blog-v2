import React from "react";
import { useAuth } from "../hooks/auths";
import { formatDistanceToNow } from "date-fns";
import { useDeletePost, usePostById } from "../hooks/posts";
 
import { useUser } from "../hooks/user";
import DOMPurify from "dompurify";
import { useCategories } from "../hooks/categories";
import { useComments } from "../hooks/comments";
import { Link } from "react-router-dom";
import Likes from "./posts/Likes";

const PostCard = ({ postId,autherId }) => {
  
  const { user, isLoading: authLoading } = useAuth();
  const { post,fetchPost, isLoading: isLoadingPost, error } = usePostById(postId);
  const { comments, isLoading: isCommentsLoading } = useComments(post?.id);
   
  const { deletePost, isLoading: isDeleteLoading } = useDeletePost(post?.id);

  // Get author information
  const { user: author, isLoading: isAuthorLoading } = useUser(autherId);

  // Get category information
  const categoryId = post?.category;
  const { categories: selectedCategory, isLoading: isCategoryLoading } = 
    useCategories(categoryId);

  if (isLoadingPost) return <>Loading...</>;

  // Safely access post content
  const firstBlock = post?.blocks?.[0];
  const sanitizedContent = firstBlock?.type === "text" 
    ? DOMPurify.sanitize(firstBlock.content)
    : "";
  const showReadMore = sanitizedContent.length > 100;

  return (
    <div className="entry bf-gallery clearfix">
      <div className="entry-title">
        <h2>
          <Link to={`/posts/${post?.id}`}>
            {post?.title}
          </Link>
        </h2>
      </div>

      <ul className="entry-meta clearfix">
        <li>
          <i className="fa-regular fa-calendar" />{" "}
          {formatDistanceToNow(post?.date)} ago
        </li>
        <li>
          <strong>
            <i className="fa-solid fa-user" />{" "}
            {isAuthorLoading ? "Loading..." : author?.displayName || "Anonymous"}
          </strong>
        </li>
        <li>
          <strong>
            <i className="fa-solid fa-tag" />{" "}
            {isCategoryLoading
              ? "Loading..."
              : selectedCategory?.[0]?.name || "Uncategorized"}
          </strong>
        </li>
        <li>
          <strong>
            <i className="fa-regular fa-comment" />{" "}
            {isCommentsLoading ? "..." : comments?.length || 0} Comments
          </strong>
        </li>
        <li>
        {!isLoadingPost &&  <Likes post={post} fetchPost={fetchPost} />
                   }
        </li>
        {!authLoading && user?.id === post?.uid && (
          <li>
            <Link
              onClick={deletePost}
              disabled={isDeleteLoading}
              className="text-danger"
            
            >
              <i className="fa-regular fa-trash-can text-danger" />
            </Link>
          </li>
        )}
      </ul>

      <div className="entry-content">
        {firstBlock?.type === "text" && (
          <div
            className="prose mb-4"
            dangerouslySetInnerHTML={{
              __html: sanitizedContent.substring(0, 100),
            }}
          />
        )}
        {showReadMore && (
          <Link to={`/posts/${post?.id}`} className="more-link">
            Read More
          </Link>
        )}
      </div>
    </div>
  );
};

export default PostCard;