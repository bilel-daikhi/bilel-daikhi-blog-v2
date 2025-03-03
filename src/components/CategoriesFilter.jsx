import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCategories } from '../hooks/categories';

const CategoriesFilter = () => {
    const { categories, isLoadingCatgories } = useCategories();
      const [searchParams] = useSearchParams();
   
      const category = searchParams.get('category');
      if(isLoadingCatgories)
        return (
            <div className="d-flex justify-content-center align-items-center vh-100" style={{  color: '#1700ff'}}>
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          
          );
      
    return (
        <div className="widget widget_links clearfix">
        <h4>Blog Filter</h4>
        <ul id="blog-filter">
          <li>
            <Link to="/" data-filter="*">
              <div>Show All</div>
            </Link>
          </li>
          {categories &&
            categories.map((cat, index) => {
              return (
                <li key={index}>
                  <Link
                    to={`/?category=${cat.id}`}
                    data-filter=".bf-image"
                    className={cat.id === category ? "active" : ""}
                  >
                    <div>{cat.name}</div>
                  </Link>
                </li>
              )
            })}
          
        </ul>
      </div>
    );
};

export default CategoriesFilter; 