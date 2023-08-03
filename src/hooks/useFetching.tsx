import { useState } from "react";
import useLoading from "./useLoading";

const useFetching = (callback:any) => {
  const [error, setError] = useState(null);
  const [applyLoading, loading] = useLoading({
    callback,
    onError: (error:any) => {
      setError(error);
    },
  });

  return [applyLoading, loading, error];
};

export default useFetching;

