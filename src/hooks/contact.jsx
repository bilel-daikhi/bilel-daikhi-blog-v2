import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../lib/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
export function useAddContact() {
  const [isLoading, setLoading] = useState(false);
  // const toast = useToast();

  async function addContact(contact) {
    setLoading(true);
    const id = uuidv4();
    await setDoc(doc(db, "contacts", id), {
      ...contact,
      id,
      date: Date.now(),
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

  return { addContact, isLoading };
}

export function useContacts(uid = null) {
  const q = uid
    ? query(
        collection(db, "contacts"),
        orderBy("date", "text"),
        where("uid", "==", uid)
      )
    : query(collection(db, "contacts"), orderBy("date", "title"));
  const [contacts, isLoading, error] = useCollectionData(q);
  if (error) throw error;
  return { contacts, isLoading };
}

export function useDeleteContact(id) {
  const [isLoading, setLoading] = useState(false);
  //    const toast = useToast();

  async function deleteContact() {
    const res = window.confirm("Are you sure you want to delete this contact?");

    if (res) {
      setLoading(true);

      await deleteDoc(doc(db, "contacts", id));
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

  return { deleteContact, isLoading };
}
