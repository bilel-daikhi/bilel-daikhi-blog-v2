import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { usePostTags } from '../hooks/tags';

const SelectedPostTags = ({ post }) => {
  const {tags,isLoading}=  usePostTags(post.tags)
    return (
        <div className="tagcloud clearfix bottommargin mt-3">
        {!isLoading && tags.map(tag=>{
        return ( <Link to={`/?tag=${tag.id}`}>{tag.name}</Link>)
        })}
      
      </div>

    );
};

export default SelectedPostTags;