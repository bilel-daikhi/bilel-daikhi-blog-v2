import { useForm } from "react-hook-form";
import { useAddPost } from "../hooks/posts";
import { useAuth } from "../hooks/auths";
import TextCodeEditor from "../components/posts/RichText";
import { useTags } from "../hooks/tags";
import { useState } from "react";
import MultiSelectCheckbox from "../components/posts/MultiSelectCheckbox";
import { useCategories } from "../hooks/categories";

export default function NewPost() {
  const { addPost, isLoading } = useAddPost();
  const [blocks, setBlocks] = useState([]);
  const { tags, isLoadingTags } = useTags(null);
  const { categories, isLoadingCategories } = useCategories(null);
  const { user, authLoading } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [selectedTags, setSelectedTags] = useState([]);

  const handleAddPost = (data) => {
    addPost({
      uid: user.id,
      title: data.title,
      category: data.category,
      blocks: blocks,
      tags: selectedTags,
    }).then(() => {
      reset();
      setSelectedTags([]);
      setBlocks([]);
    });
  };

  const toggleTag = (tagId) => {
    setSelectedTags((prev) => {
      const newTags = prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId];
      setValue("tags", newTags);
      return newTags;
    });
  };

  return (
    <section id="content">
      <div className="content-wrap">
        <div className="container clearfix">
          <div className="postcontent nobottommargin">
            <h3>Add New Post</h3>

            <div className="form-widget">
              <form onSubmit={handleSubmit(handleAddPost)}>
                {/* Title Input */}
                <div className="col_full">
                  <label htmlFor="title">
                    Subject <small>*</small>
                  </label>
                  <input
                    type="text"
                    id="title"
                    {...register("title", { required: true, maxLength: 120 })}
                    className={`sm-form-control ${errors.title ? "error" : ""}`}
                  />
                  {errors.title && (
                    <p className="error-message">
                      Title is required (max 120 characters)
                    </p>
                  )}
                </div>

                {/* Tags Select */}
                <div className="col_two_third">
                  <label htmlFor="tags">Tags</label>
                  <MultiSelectCheckbox
                    tags={tags}
                    selectedTags={selectedTags}
                    toggleTag={toggleTag}
                    isLoadingTags={isLoadingTags}
                  />
                  {errors.tags && (
                    <p className="error-message">
                      At least one tag is required
                    </p>
                  )}
                  <input
                    type="hidden"
                    {...register("tags", { required: true })}
                  />
                </div>

                {/* Category Select */}
                <div className="col_one_third col_last">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    {...register("category", { required: true })}
                    className="sm-form-control"
                  >
                    <option value="">-- Select One --</option>
                    {categories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="error-message">Category is required!</p>
                  )}
                </div>

                {/* Content Editor */}
                <div className="col_full">
                  <label htmlFor="desc">
                    Content <small>*</small>
                  </label>
                  <TextCodeEditor blocks={blocks} setBlocks={setBlocks} />
                  {blocks.length === 0 && (
                    <p className="error-message">Content is required</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="col_half col_last tright">
                  <button
                    className="button button-3d nomargin"
                    type="submit"
                    disabled={isLoading || authLoading}
                  >
                    {isLoading ? "Submitting..." : "Add Post"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
