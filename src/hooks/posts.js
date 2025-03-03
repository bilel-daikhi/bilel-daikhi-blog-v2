import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../lib/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
export function useAddPost() {
  const [isLoading, setLoading] = useState(false);
  // const toast = useToast();

  async function addPost(post) {
    setLoading(true);
    const id = uuidv4();
    await setDoc(doc(db, "posts", id), {
      ...post,
      id,
      date: Date.now(),
      likes: [],
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

  return { addPost, isLoading };
}
const PAGE_SIZE = 2; // Number of posts per page
export function usePosts(page = 1, tag = null, category = null) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [lastVisible, setLastVisible] = useState(null);

  // Base query construction
  const buildBaseQuery = () => {
    let q = collection(db, "posts");

    if (tag) {
      q = query(q, where("tags", "array-contains", tag));
    } else if (category) {
      q = query(q, where("category", "==", category));
    }

    return query(q, orderBy("date", "desc"));
  };

  // Fetch total count of matching documents
  const getTotalCount = async () => {
    const countQuery = buildBaseQuery();
    const snapshot = await getCountFromServer(countQuery);
    return snapshot.data().count;
  };

  // Fetch paginated posts
  const fetchPosts = async () => {
    try {
      setIsLoading(true);

      // Get total count for pagination
      const totalPosts = await getTotalCount();
      const calculatedTotalPages = Math.ceil(totalPosts / PAGE_SIZE);
      setTotalPages(calculatedTotalPages);

      // Build paginated query
      let q = buildBaseQuery();
      if (page > 1) {
        const prevQuery = buildBaseQuery();
        const prevSnapshot = await getDocs(
          query(prevQuery, limit((page - 1) * PAGE_SIZE))
        );
        const last = prevSnapshot.docs[prevSnapshot.docs.length - 1];
        q = query(q, startAfter(last), limit(PAGE_SIZE));
      } else {
        q = query(q, limit(PAGE_SIZE));
      }

      const snapshot = await getDocs(q);
      const newPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(newPosts);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page, tag, category]);

  return {
    posts,
    isLoading,
    error,
    totalPages,
  };
}
export function usePopularPosts() {
  const q = query(collection(db, "posts"), orderBy("likes"));
  const [posts, isLoading, error] = useCollectionData(q, limit(4));
  if (error) throw error;
  return { posts, isLoading };
}

export function useToggleLike({ id, isLiked, uid }) {
  const [isLoading, setLoading] = useState(false);

  async function toggleLike() {
    setLoading(true);
    const docRef = doc(db, "posts", id);
    await updateDoc(docRef, {
      likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
    });
    setLoading(false);
  }

  return { toggleLike, isLoading };
}

export function useDeletePost(id) {
  const [isLoading, setLoading] = useState(false);
  //    const toast = useToast();

  async function deletePost() {
    const res = window.confirm("Are you sure you want to delete this post?");

    if (res) {
      setLoading(true);

      // Delete post document
      await deleteDoc(doc(db, "posts", id));
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

  return { deletePost, isLoading };
}
