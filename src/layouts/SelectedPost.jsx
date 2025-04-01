import React from "react";

 
import {Link, Link as routerLink, useParams} from "react-router-dom";
 
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import DOMPurify from "dompurify";
import { formatDistanceToNow, set } from "date-fns";
import { useAuth } from "../hooks/auths";
import { usePostById, useToggleLike } from "../hooks/posts";
import { ListComments } from "../components/ListComments";
import PostTags from "../components/posts/PostTags";
import PopularPosts from "../components/posts/PopularPosts";
import SyntaxHighlighter from "react-syntax-highlighter";
import SelectedPostTags from "../components/SelectedPostTags";
import Likes from "../components/posts/Likes";
 

export default function SelectedPost() {
  const {user, isLoading: authLoading} = useAuth();
    const {postId} = useParams();
    const { post,fetchPost, isPostLoading, error} = usePostById(postId);
    
  
 
    if (isPostLoading) return <div>Loading post...</div>;
  
     

    // Handle case where post is null/undefined
    if (!isPostLoading && !post) return <div>Post not found</div>;
 

  return (
      <>
 

          <div className="content-wrap">

            <div className="container clearfix">


              <div className="postcontent nobottommargin clearfix">

                <div className="single-post nobottommargin">


                  <div className="entry clearfix">


                    <div className="entry-title">
                      <h2>{post.title}</h2>
                    </div>

                    <ul className="entry-meta clearfix">
                      <li><i className="fa-solid fa-calendar-days"></i> {post.date && formatDistanceToNow(post?.date)} ago</li>
                      <li><strong><i className="fa-solid fa-user"></i> Bilel Daikhi</strong></li>
                    <li>
                {post &&  <Likes post={post}   fetchPost={fetchPost} />
                   } </li>
                   
                   
                    </ul>
                    
                      <div className="entry-content notopmargin">

      
     {post &&   <div className="card">
          <div className="card-body">
            {post.blocks?.map((block, index) =>
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
  
                            
                    {post.tags &&  <SelectedPostTags post={post}/>
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

                 
                <ListComments postId={post.id}/>
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
