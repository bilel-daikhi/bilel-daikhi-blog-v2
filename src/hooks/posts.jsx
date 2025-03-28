import { useCallback, useEffect, useState } from "react";
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
  getCountFromServer,
  getDoc,
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
 

  async function addPost(post) {
    setLoading(true);
    const id = uuidv4();
    await setDoc(doc(db, "posts", id), {
      ...post,
      id,
      date: Date.now(),
      likes: [],
    });
     toast.success("Post added successfully!", {
                  isClosable: true,
                  autoClose: 3000,
                });
          
    setLoading(false);
  }

  return { addPost, isLoading };
}
const PAGE_SIZE = 10; // Number of posts per page
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

export function useToggleLike({ id, isLiked, uid, onSuccess  }) {
  const [isLoading, setLoading] = useState(false);
  async function toggleLike() {
    setLoading(true);
    console.log("id", id);
    console.log("isLiked", isLiked);
    console.log("uid", uid);
  
    try{
      const docRef = doc(db, "posts", id);
      await updateDoc(docRef, {
      likes: isLiked ? arrayRemove(uid) : arrayUnion(uid),
    });
    // Execute success callback if provided
      if (onSuccess) {
        await onSuccess();  // Use this to trigger data refresh in parent
      }
  }catch(error){
    console.error(JSON.stringify(error))
    toast.error("An error occurred. Please try again later.");
  }
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
      toast.success("Post deleted!", {
        isClosable: true,
        autoClose: 3000,
      });
     
      setLoading(false);
    }
  }

  return { deletePost, isLoading };
}export function usePostById(id) {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPost = useCallback(async () => {
    setIsLoading(true);
    try {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPost({ id: docSnap.id, ...docSnap.data() });
      } else {
        setError("Post not found");
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [id]); // Add id as dependency

  useEffect(() => {
    if (id) fetchPost();
  }, [id, fetchPost]);

  return { 
    post,
    fetchPost, // Expose fetchPost for manual refreshes
    isLoading, 
    error 
  };
}