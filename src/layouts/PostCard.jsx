import React from "react";
import { useAuth } from "../hooks/auths";
import { formatDistanceToNow } from "date-fns";
import { useDeletePost, usePostById, useToggleLike } from "../hooks/posts";
 
import { useUser } from "../hooks/user";
import DOMPurify from "dompurify";
import { useCategories } from "../hooks/categories";
import { useComments } from "../hooks/comments";
import { Link } from "react-router-dom";

const PostCard = ({ postId,autherId }) => {
  
  const { user, isLoading: authLoading } = useAuth();
  const { post,fetchPost, isLoading: isLoadingPost, error, mutate: mutatePost } = usePostById(postId);
  const { comments, isLoading: isCommentsLoading } = useComments(post?.id);
  const { toggleLike, isLoading: isLikeLoading } = useToggleLike({
    id: post?.id,
    isLiked: post?.likes?.includes(user?.id),
    uid: user?.id,
    onSuccess: fetchPost // Add this line to trigger refresh
  });
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
          <routerLink to={`/posts/${post?.id}`}>
            {post?.title}
          </routerLink>
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
          <Link 
            onClick={toggleLike}
            disabled={authLoading || isLikeLoading}
             
          >
            {post?.likes?.includes(user?.id) ? (
              <i className="fa-solid fa-heart mr-1 text-danger" />
            ) : (
              <i className="fa-regular fa-heart mr-1" />
            )}
            {post?.likes?.length || 0} Likes
          </Link>
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