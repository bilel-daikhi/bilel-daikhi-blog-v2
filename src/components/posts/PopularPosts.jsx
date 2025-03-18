import React from 'react';
import { Link } from 'react-router-dom';
import { usePopularPosts } from '../../hooks/posts';
import { useAuth } from '../../hooks/auths';
import PopularPostCard from './PopularPostCard';

export const PopularPosts = () => {
    const {posts, isLoading} = usePopularPosts();
    
      const {user, authLoading} = useAuth();

      if (isLoading)
        return (
          <div className="d-flex justify-content-center align-items-center vh-100" style={{  color: '#1700ff'}}>
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        
        );
    return (
        <div className="widget clearfix">
        <div className="tabs nobottommargin clearfix" id="sidebar-tabs">
               <h4>Popular Posts</h4>
          
          <div className="tab-container">
            <div className="tab-content clearfix" id="tabs-1">
              <div id="popular-post-list-sidebar">
               {posts.map((post,index)=>
                 <div key={index} className="spost clearfix">
                 <PopularPostCard post={post}/>
                </div>
              )}
             
              
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default PopularPosts;