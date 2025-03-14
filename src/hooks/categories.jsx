import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../lib/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { toast } from "react-toastify";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
export function useAddCategory() {
  const [isLoading, setLoading] = useState(false);
  // const toast = useToast();

  async function addCategory(category) {
    setLoading(true);
    const id = uuidv4();
    await setDoc(doc(db, "categories", id), {
      ...category,
      id,
      date: Date.now(),
      posts: [],
    });
    toast.success("Category added successfully!", {
      isClosable: true,
      autoClose: 3000,
    });
     
    setLoading(false);
  }

  return { addCategory, isLoading };
}

export function useCategories(uid = null) {
  const q = uid
    ? query(
        collection(db, "categories"),
        orderBy("name"),
        where("id", "==", uid)
      )
    : query(collection(db, "categories"), orderBy("name"));
  const [categories, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { categories, isLoading };
}

export function usePostByCategories() {
  const q = query(collection(db, "categories"), orderBy("posts"));
  const [categories, isLoading, error] = useCollectionData(q, limit(4));
  if (error) throw error;
  return { categories, isLoading };
}

export function useDeleteCategory(id) {
  const [isLoading, setLoading] = useState(false);
  //    const toast = useToast();

  async function deleteCategory() {
    const res = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (res) {
      setLoading(true);

      // Delete post document
      await deleteDoc(doc(db, "categories", id));
      toast.success("Category deleted!", {
        isClosable: true,
        autoClose: 3000,
      });
      
      setLoading(false);
    }
  }

  return { deleteCategory, isLoading };
}
