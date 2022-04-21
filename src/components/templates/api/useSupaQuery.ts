import { useQuery, QueryConfig } from "react-query";
import { useFetcher } from "./fetcher";

export function useSupaQuery<TResult, TError = unknown>(
  key: string,
  options?: QueryConfig<TResult, TError>
) {
  const fetcher = useFetcher();
  return useQuery<TResult, TError>(key, fetcher, options);
}
