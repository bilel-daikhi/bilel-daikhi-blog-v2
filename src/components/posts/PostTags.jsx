import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTags } from '../../hooks/tags';

 const PostTags = () => {
  const {tags, isLoading}= useTags(); 
    const [searchParams] = useSearchParams();
    const tag = searchParams.get('tag'); 
    if(isLoading)
      return 'Loading...';
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
        <h4>Tags</h4>
        <div className="tagcloud active">
  
       {tags && tags?.map((tagItem,index)=>{return (   <Link key={index} className={tagItem.id === tag ? 'active':''} to={`/?tag=${tagItem.id}`}>{tagItem.name} </Link>)})}
        
        </div>
      </div>
    );
};

export default PostTags;