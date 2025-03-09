import React from "react";
import PopularPosts from "./PopularPosts";
import PostTags from "./PostTags";
import "./SideMenu.css";
import CategoriesFilter from "../CategoriesFilter";
export function SideMenu() {
  return (
    <div className="sidebar-widgets-wrap">
      <CategoriesFilter />

      <PopularPosts />

      <PostTags />
    </div>
  );
}
