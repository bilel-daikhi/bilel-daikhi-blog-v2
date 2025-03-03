import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MultiSelectCheckbox = ({ 
  tags = [], 
  selectedTags = [], 
  toggleTag, 
  isLoadingTags 
}) => {  
  const [isOpen, setIsOpen] = React.useState(false);

  return (  
    <div className="form-group">
  

 

      {/* Dropdown Multi-Select */}
      <div className={`dropdown ${isOpen ? 'show' : ''}`}>
        <button
          className="sm-form-control text-left dropdown-toggle"
          type="button"
          id="multiSelectDropdown"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          Select Tags
        </button>

        <div 
          className={`dropdown-menu w-100 ${isOpen ? 'show' : ''}`}
          aria-labelledby="multiSelectDropdown"
        >
          {isLoadingTags ? (
            <div className="dropdown-item-text text-muted">Loading tags...</div>
          ) : tags.length === 0 ? (
            <div className="dropdown-item-text text-muted">No tags available</div>
          ) : (
            tags.map(tag => (
              <Link
                key={tag.id}
                href="#"
                className={`dropdown-item d-flex justify-content-between align-items-center ${
                  selectedTags.includes(tag.id) ? 'active' : ''
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  toggleTag(tag.id);
                }}
              >
                {tag.name}
                {selectedTags.includes(tag.id) && (
                  <span className="badge badge-light">
                    ✓
                  </span>
                )}
              </Link>
            ))
          )}
        </div>
      </div>
    {/* Selected Tags Display */}
    <div className="tagcloud clearfix bottommargin mt-2" >
        {selectedTags.map(tagId => {  
          const tag = tags.find(t => t.id === tagId);  
          return ( <Link onClick={(e) => {
                  e.stopPropagation();
                  toggleTag(tagId);
                }} >{tag?.name} <i className="fa fa-trash text-danger" aria-hidden="true"></i></Link>
                                
           
          );  
        })}  
                             </div>
      {/* Hidden Input for Form Submission */}
      <input
        type="hidden"
        name="tags"
        value={selectedTags}
      />
    </div>
  );  
};  

MultiSelectCheckbox.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired
    })
  ),
  selectedTags: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  toggleTag: PropTypes.func.isRequired,
  isLoadingTags: PropTypes.bool
};

export default MultiSelectCheckbox;