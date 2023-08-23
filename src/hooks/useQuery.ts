import { useState, useEffect, useTransition, useRef } from "react";

type Status = "idle" | "pending" | "succeeded" | "failed";

export interface UseQueryResponse<T> {
  status: Status;
  data: T | null;
  error: Error | null;
}

export function useQuery<T = unknown>(url: string): UseQueryResponse<T> {
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const [isPending, startTransition] = useTransition();

  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    setStatus("pending");

    startTransition(() => {
      fetch(url)
        .then((response) => {
          if (!response.ok)
            throw new Error(`${response.status}: ${response.statusText}`);
          return response.json();
        })
        .then((responseData) => {
          if (mountedRef.current) {
            setData(responseData);
            setStatus("succeeded");
          }
        })
        .catch((err) => {
          if (mountedRef.current) {
            setError(err);
            setStatus("failed");
          }
        });
    });
  }, [url, startTransition]);

  return { status: isPending ? "pending" : status, data, error };
}
