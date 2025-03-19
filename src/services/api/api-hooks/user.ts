import { useMutation } from "@tanstack/react-query";
import { GitHubSearchResponse } from "../api-types/user.type";
import { useUserStore } from "@/services/stores/user.store";
import { GITHUB_API_URL, GITHUB_TOKEN } from "@/constants/constants";
import { fetcher } from "../fetcher";

export const useGetUsers = ({
  username,
  per_page = 5,
}: {
  username: string;
  per_page?: number;
}) => {
  const { setUserData } = useUserStore();

  const { mutate, isPending, error, data } = useMutation<GitHubSearchResponse>({
    mutationFn: () =>
      fetcher<GitHubSearchResponse>({
        url: `${GITHUB_API_URL}/search/users?q=${username}&per_page=${per_page}`,
      }),
    onSuccess: (data) => {
      setUserData(data);
    },
  });

  return { mutate, isPending, error, data };
};
