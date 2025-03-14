import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAddComment } from '../../hooks/comments';
import { useAuth } from '../../hooks/auths';

const NewComment = (postId ) => {
    const {user, authLoading} = useAuth();
    const {addComment, isLoading} = useAddComment(postId);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
      } = useForm();
      const handleAddComment = data => {
        console.log('data: '+data);
        addComment({
          uid: user.id,
          text: data.text, 
          name: user.username,
          avatar: user.avatar,
        });
        reset(); 
      };
    return (
      <div id="respond" className="clearfix">
        <h3>Leave a <span>Comment</span></h3>
        {user ? (
          <form className="clearfix" onSubmit={handleSubmit(handleAddComment)} id="commentform">
            <div className="col_full">
              <label htmlFor="comment">Comment</label>
              <textarea
                name="comment"
                {...register("text", { required: true, maxLength: 500 })}
                cols="58"
                rows="7"
                tabIndex="4"
                className="sm-form-control"
              ></textarea>
              {errors.text && errors.text.type === "required" && (
                <p className="text-danger">This field is required!</p>
              )}
              {errors.text && errors.text.type === "maxLength" && (
                <p className="text-danger">Comment cannot exceed 500 characters!</p>
              )}
            </div>
            <div className="col_full nobottommargin">
              <button
                name="submit"
                type="submit"
                id="submit-button"
                tabIndex="5"
                value="Submit"
                className="button button-3d nomargin"
              >
                Submit Comment
              </button>
            </div>
          </form>
        ) : (
          <p>
            Please <Link to="/login">Login</Link> to comment
          </p>
        )}
      </div>
    );
};

export default NewComment;