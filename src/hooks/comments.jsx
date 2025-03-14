import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../lib/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { toast } from "react-toastify";
import {
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
export function useAddComment(postId) {
  const [isLoading, setLoading] = useState(false);
  // const toast = useToast();

  async function addComment(comment) {
    setLoading(true);
    const id = uuidv4();
    console.log('comment: '+JSON.stringify(comment));
    await setDoc(doc(db, "comments", id), {
      ...comment,
      id,
      date: Date.now(),
      postId:postId.postId
    });
    toast.success("Comment added successfully!", {
              isClosable: true,
              autoClose: 3000,
            });
             
    setLoading(false);
  }

  return { addComment, isLoading };
}

export function useComments(postId = null) {
  const q = postId
    ? query(
        collection(db, "comments"),
        orderBy("date", "desc"),
        where("postId", "==", postId)
      )
    : null;
  const [comments, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { comments, isLoading };
}

export function useDeleteComment(id) {
  const [isLoading, setLoading] = useState(false);
 

  async function deleteComment() {
    const res = window.confirm("Are you sure you want to delete this comment?");

    if (res) {
      setLoading(true);
try{
      // Delete post document
      await deleteDoc(doc(db, "comments", id));
      toast.success("Comment deleted!", {
        isClosable: true,
        autoClose: 3000,
      });
      
    } catch (error) {
      toast.error("Delete Comment failed!", {
        isClosable: true,
        autoClose: 3000,
      });
 
    } finally {
      setLoading(false);
    }
    }
  }

  return { deleteComment, isLoading };
}
