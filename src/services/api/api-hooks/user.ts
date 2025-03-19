import { useMutation } from "@tanstack/react-query";
import { GitHubSearchResponse } from "../api-types/user.type";

export const useGetUsers = ({
  username,
  per_page = 5,
}: {
  username: string;
  per_page?: number;
}) => {
  const { mutate, isPending, error, data } = useMutation<GitHubSearchResponse>({
    mutationFn: () =>
      fetch(
        `https://api.github.com/search/users?q=${username}&per_page=${per_page}`
      ).then((res) => res.json()),
  });

  return { mutate, isPending, error, data };
};
