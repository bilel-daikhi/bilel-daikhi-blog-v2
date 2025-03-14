
 
import React, { useEffect } from "react";
import {usePostByTag, usePosts} from "../hooks/posts";
import SinglePost from "./SinglePost"; 
import {Pagination} from "../components/Pagination";
import {SideMenu} from "../components/posts/SideMenu";
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/auths";
export default function PostList() {
 
  const [searchParams] = useSearchParams();
  const tag = searchParams.get('tag');
  const category = searchParams.get('category');
  const page = parseInt(searchParams.get('page')) || 1;
  const { posts, isLoading, totalPages } = usePosts(page, tag || undefined, category || undefined);
 
  const {user, authLoading} = useAuth();

  // const {user, isLoading: userLoading} = useUser();
  
  if (isLoading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100" style={{  color: '#1700ff'}}>
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
    
    );

  return ( 
<>
<div className="row mb-3">
							<div class="col-6">
              {user && (            <Link to="/add-post" className="button button-3d button-black mt-3 float-right "> Add New Post</Link>)}
         
                            </div></div>
                            <div className="content-wrap">
            
          <div className="container clearfix">

              <div className="postcontent nobottommargin clearfix">

                  <div id="posts">

                      {posts && posts.map((post,index) => (

                       <SinglePost key={index} post={post} />

                      ))}

                  {totalPages > 1 &&    <Pagination currentPage={page} totalPages={totalPages} /> }

                  </div>
                  
              </div>
         
               <div className="sidebar nobottommargin col_last clearfix">
                   <SideMenu tag={tag} category={category}/>
              </div>
          </div>
 
      </div>

</>
       


  );
}
