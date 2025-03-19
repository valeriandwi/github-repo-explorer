import { useQuery } from "@tanstack/react-query";
import { GitHubRepositoryResponse } from "../api-types/repositories.type";
import { GITHUB_API_URL } from "@/constants/constants";
import { fetcher } from "../fetcher";

export const useGetRepositoryPerUser = ({ username }: { username: string }) => {
  const { isLoading, error, data } = useQuery<GitHubRepositoryResponse[]>({
    queryKey: ["getRepositories", username],
    queryFn: () =>
      fetcher<GitHubRepositoryResponse[]>({
        url: `${GITHUB_API_URL}/users/${username}/repos`,
      }),
    enabled: !!username,
  });

  return { isLoading, error, data };
};
