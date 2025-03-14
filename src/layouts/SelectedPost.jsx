import React, {useEffect, useState} from "react";

 
import {Link, Link as routerLink, useParams} from "react-router-dom";
import {db} from "../lib/firebase";
import {doc, onSnapshot} from "firebase/firestore"; 
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import DOMPurify from "dompurify";
import { formatDistanceToNow, set } from "date-fns";
import { useAuth } from "../hooks/auths";
import { useToggleLike } from "../hooks/posts";
import { ListComments } from "../components/ListComments";
import PostTags from "../components/posts/PostTags";
import PopularPosts from "../components/posts/PopularPosts";
import SyntaxHighlighter from "react-syntax-highlighter";
import SelectedPostTags from "../components/SelectedPostTags";
 

export default function SelectedPost() {
    const {user, isLoading: authLoading} = useAuth();
  const {postId} = useParams();
  const [selectedPost, setSelectedPost] = useState([]);
  const [tags, setTags] = useState([]);
 
 
 
  const [isLiked, setIsLiked]= useState(Boolean);
 
  useEffect(() => {
    onSnapshot(doc(db, "posts", postId), snapshot => {
      setSelectedPost({...snapshot.data(), id: snapshot.id});
      setIsLiked(snapshot.data().likes.includes(user?.id));
       
  });
  }, [ ]);
  const {toggleLike, isLoading} = useToggleLike({
    postId,
    isLiked,
    uid: user?.id,
  }); 
  return (
      <>
 

          <div className="content-wrap">

            <div className="container clearfix">


              <div className="postcontent nobottommargin clearfix">

                <div className="single-post nobottommargin">


                  <div className="entry clearfix">


                    <div className="entry-title">
                      <h2>{selectedPost.title}</h2>
                    </div>

                    <ul className="entry-meta clearfix">
                      <li><i className="fa-solid fa-calendar-days"></i> {selectedPost.date && formatDistanceToNow(selectedPost?.date)} ago</li>
                      <li><strong><i className="fa-solid fa-user"></i> Bilel Daikhi</strong></li>
                
                      <li>{user ? (<Link  onClick={toggleLike} size='md' isLoading={authLoading || isLoading}>  {isLiked ? <i className="fa-regular fa-heart mr-2"></i> : <i className="fa-solid fa-heart mr-2"></i> }  {selectedPost.likes && selectedPost.likes.length } Likes</Link>) : (<strong>{ selectedPost.likes && selectedPost.likes.length } Likes</strong>)}</li>
                 
                    </ul>
                    
                      <div className="entry-content notopmargin">

      
     {selectedPost &&   <div className="card">
          <div className="card-body">
            {selectedPost.blocks?.map((block, index) =>
              block.type === "text" ? (
                <div
                  key={index}
                  className="prose mb-4"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(block.content) }}
                />
              ) : (
                <div key={index} className="mb-4">
                  <SyntaxHighlighter
                    language={block.language}
                    style={dracula}
                    showLineNumbers
                    wrapLines
                  >
                    {block.content}
                  </SyntaxHighlighter>
                </div>
              )
            )}
          </div>
        </div>}
  
                            
                    {selectedPost.tags &&  <SelectedPostTags post={selectedPost}/>
                       }
                    </div>
                  </div>
                    
 
                   <div className="card">
                    <div className="card-header">Posted by: <strong style={{color: 'blue'}}> Bilel Daikhi</strong></div>
                    <div className="card-body">
                      <div className="author-image">
                        <img src="https://firebasestorage.googleapis.com/v0/b/bilel-daikhi-portfolio.appspot.com/o/cv%2Fbilel2.png?alt=media&token=b31aa701-a945-48b6-8513-2a95394d8d94" alt="" className="rounded-circle"/>
                      </div>
                      <p>
                        <i className="fas fa-code"></i> Dynamic Full Stack Java Developer transforming ideas into <strong>intelligent solutions</strong>. <br/>
                        Expert in <strong>Java</strong>, <strong>Spring</strong>, and <strong>modern JavaScript frameworks</strong>, crafting <strong>scalable, high-performance applications</strong> that drive business success.
                      </p>
                      <div className="contacts d-flex justify-content-end">
                        <Link to="mailto:bilel.daikhi@gmail.com" title="Email" className="mr-3"><i className="fas fa-envelope"></i></Link>
                        <Link to="https://bilel-daikhi-portfolio.web.app" target="_blank" title="Website" className="mr-3"><i className="fas fa-globe"></i></Link>
                        <Link to="https://www.linkedin.com/in/bilel-daikhi" target="_blank" title="LinkedIn"><i className="fab fa-linkedin"></i></Link>
                      </div>
                    </div>
                  </div>

                  <div className="line"></div>

                 
                <ListComments postId={selectedPost.id}/>
                </div>

              </div>
               <div className="sidebar nobottommargin col_last clearfix">
                <div className="sidebar-widgets-wrap">


                 <PopularPosts/>

               

                  <PostTags/>

                </div>

              </div>
        

            </div>
 

          </div>
 
      </>
  );
}
