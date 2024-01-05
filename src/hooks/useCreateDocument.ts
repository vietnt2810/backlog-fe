import { useState } from "react";

import { getFirestore, collection, addDoc } from "firebase/firestore";

const useCreateDocument = (collectionName: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createDocument = async (newDocument: any) => {
    setIsLoading(true);
    try {
      const db = getFirestore();
      const docRef = await addDoc(collection(db, collectionName), newDocument);
      setIsLoading(false);
      return docRef;
    } catch (err: any) {
      setError(err);
      setIsLoading(false);
      throw err;
    }
  };

  return { createDocument, isLoading, error };
};

export default useCreateDocument;
