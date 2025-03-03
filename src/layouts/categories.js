import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  useAddCategory,
  useCategories,
  useDeleteCategory,
} from "../hooks/categories";
import { useForm } from "react-hook-form";

const Categories = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const { addCategory, isLoading } = useAddCategory();
  const { categories, isLoadingCatgories } = useCategories();
  const { deleteCategory, isLoadingDelete } = useDeleteCategory();

  const handleAddCategory = (data) => {
    addCategory({ name: data.name, description: data.description }).then(() => {
      reset();
    });
  };

  const handleDeleteCategory = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    deleteCategory(updatedCategories.id);
  };

  if (isLoadingCatgories)
    return (
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ color: "#1700ff" }}
      >
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="container mt-5">
      <h2>Categories</h2>
      <div className="form-widget">
        <form onSubmit={handleSubmit(handleAddCategory)}>
          <div class="col_full">
            <label for="template-contactform-message">
              Name <small>*</small>
            </label>
            <input
              type="text"
              placeholder="Category name"
              {...register("name", { required: true, maxLength: 120 })}
              className={`sm-form-control ${errors.name ? "error" : ""}`}
            />
            {errors.name && (
              <p className="error-message">
                Title is required (max 120 characters)
              </p>
            )}
          </div>
          <div class="col_full">
            <label for="template-contactform-message">Description</label>
            <textarea
              class="required sm-form-control"
              id="template-contactform-message"
              {...register("description")}
              rows="6"
              cols="30"
              placeholder="Category description"
            ></textarea>
          </div>
          <button className="btn btn-primary mt-2" onClick={handleAddCategory}>
            Add Category
          </button>
        </form>
      </div>
      <ul className="list-group mt-3">
        {categories &&
          categories.map((category, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h1>{category.name}</h1>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteCategory(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Categories;
