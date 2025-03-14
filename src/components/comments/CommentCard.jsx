import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';

const CommentCard = (data) => {
  console.log(JSON.stringify(data.comment));
    return (
        <li className="comment even thread-even depth-1" id="li-comment-1">

        <div id="comment-1" className="comment-wrap clearfix">

          <div className="comment-meta">

            <div className="comment-author vcard">

                                    <span className="comment-avatar clearfix">
                                    
                                    {data.comment.avatar ? <img alt='User Avatar'
                                         src={data.comment.avatar}
                                         className='avatar avatar-60 photo avatar-default' height='60'
                                         width='60'/>:<img alt=''
                                         src='https://0.gravatar.com/avatar/ad516503a11cd5ca435acc9bb6523536?s=60'
                                         className='avatar avatar-60 photo avatar-default' height='60'
                                         width='60'/>}</span>

            </div>

          </div>

          <div className="comment-content clearfix">

            <div className="comment-author">{data.comment.name}<span><Link to="#" title="Permalink to this comment">{data.comment.date && formatDistanceToNow(data.comment.date)} ago</Link></span>
            </div>

            <p>{data.comment.text}</p>
 
          </div>

          <div className="clear"></div>

        </div>



      </li>
    );
};

export default CommentCard;