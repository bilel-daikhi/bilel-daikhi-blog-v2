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
export function useAddTag() {
  const [isLoading, setLoading] = useState(false);
  // const toast = useToast();

  async function addTag(tag) {
    setLoading(true);
    const id = uuidv4();
    await setDoc(doc(db, "tags", id), {
      ...tag,
      id,
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

  return { addTag, isLoading };
}

export function useTags(uid = null) {
  const q = uid
    ? query(collection(db, "tags"), orderBy("name"), where("uid", "==", uid))
    : query(collection(db, "tags"), orderBy("name"));
  const [tags, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { tags, isLoading };
}
export function usePostTags(tagIds) {
  const q = query(collection(db, "tags"), where("id", "in", tagIds));
  const [tags, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { tags, isLoading };
}

export function useDeleteTag() {
  const [isLoading, setLoading] = useState(false);
  //    const toast = useToast();

  async function deleteTag(id) {
    const res = window.confirm("Are you sure you want to delete this Tag?");

    if (res) {
      setLoading(true);

      // Delete post document
      await deleteDoc(doc(db, "tags", id));
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

  return { deleteTag, isLoading };
}
