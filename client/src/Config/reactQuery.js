import { QueryClient } from "react-query";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangePropsExclusions: ["isStale"],
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 0,
    },
  },
});

export default client;
