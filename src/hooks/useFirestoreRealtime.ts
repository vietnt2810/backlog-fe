import { useState, useEffect } from "react";

import {
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
} from "firebase/firestore";

import { USER_ID } from "@/constants/constants";
import { database } from "@/firebase/config";

const useFirestoreRealtime = (collectionName: string, projectId: number) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const userId = localStorage.getItem(USER_ID);

  useEffect(() => {
    const q = query(
      collection(database, collectionName),
      orderBy("createdAt", "asc"),
      where("projectId", "==", projectId)
    );

    const unsubscribe = onSnapshot(
      q,
      querySnapshot => {
        const items: any = [];
        querySnapshot.forEach(doc => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setData(items);
        setLoading(false);
      },
      err => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, projectId, userId]);

  return { data, loading, error };
};

export default useFirestoreRealtime;
