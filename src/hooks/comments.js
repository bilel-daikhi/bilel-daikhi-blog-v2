import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../lib/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
export function useAddComment() {
  const [isLoading, setLoading] = useState(false);
  // const toast = useToast();

  async function addComment(comment) {
    setLoading(true);
    const id = uuidv4();
    await setDoc(doc(db, "comments", id), {
      ...comment,
      id,
      date: Date.now(),
      comments: [],
    });
    /*        toast({
            title: "Post added successfully!",
            status: "success",
            isClosable: true,
            position: "top",
            duration: 5000,
        });*/
    setLoading(false);
  }

  return { addComment, isLoading };
}

export function useComments(uid = null) {
  const q = uid
    ? query(
        collection(db, "comments"),
        orderBy("date", "desc"),
        where("uid", "==", uid)
      )
    : query(collection(db, "comments"), orderBy("date", "desc"));
  const [comments, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { comments, isLoading };
}

export function useDeleteComment(id) {
  const [isLoading, setLoading] = useState(false);
  //    const toast = useToast();

  async function deleteComment() {
    const res = window.confirm("Are you sure you want to delete this comment?");

    if (res) {
      setLoading(true);

      // Delete post document
      await deleteDoc(doc(db, "comments", id));
      /*          toast({
                title: "Post deleted!",
                status: "info",
                isClosable: true,
                position: "top",
                duration: 5000,
            });
*/
      setLoading(false);
    }
  }

  return { deleteComment, isLoading };
}
