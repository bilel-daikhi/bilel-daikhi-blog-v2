import React, { useState } from 'react'; 
import { useAuth } from '../../hooks/auths';
import { useAddTag, useDeleteTag, useTags } from '../../hooks/tags'; 
import { useForm } from 'react-hook-form';


const TagsList = () => {
      const {tags, isLoading} = useTags();
    const {addTag, isLoadingNewTag} = useAddTag();
    const {deleteTag, isLoading: deleteLoading} = useDeleteTag();
        const {user, authLoading} = useAuth();
          const {
            register,
            handleSubmit,
            reset,
            formState: {errors},
          } = useForm();
          

    const handleAdd = (data) => {
      
            addTag({
               
                name: data.name,
                posts: [], 
              }
              
              ); 
            reset(); 
       
    };

 

 

    const handleDelete = (index) => {
        console.log('selected tag: '+tags[index].id);
        deleteTag(tags[index].id);
       // onDelete(index);
    };
    if (isLoading)
        return (
          <div className="d-flex justify-content-center align-items-center vh-100" style={{  color: '#1700ff'}}>
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        
        );
    
    return (
        <div className="tags-list">
            <table className="table">
                <thead>
                    <tr>
                        <th>Tag</th>
                        <th>Number of Posts</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tags.map((tag, index) => (
                        <tr key={index}>
                            <td>{tag.name}</td>
                            <td>{tag.posts?.length}</td>
                            <td>
                                 <button className="btn btn-primary btn-sm mr-2" onClick={() => handleDelete(index)}> Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        
                
        
            <form  onSubmit={handleSubmit(handleAdd)}>
                <div className="form-group">
                    <label htmlFor="newTag">Add New Tag</label>
                    <input 
                        type="text" 
                        id="newTag" 
                        className="form-control" 
                        {...register("name", {required: true, maxLength: 120})}
                      
                   
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
            </form>
        </div>
    );
};

export default TagsList;