import { useQuery } from "@tanstack/react-query";
import { GitHubRepositoryResponse } from "../api-types/repositories.type";

export const useGetRepositoryPerUser = ({ username }: { username: string }) => {
  const { isLoading, error, data } = useQuery<GitHubRepositoryResponse[]>({
    queryKey: ["getRepositories", username],
    queryFn: () =>
      fetch(`https://api.github.com/users/${username}/repos`).then((res) =>
        res.json()
      ),
    enabled: !!username,
  });

  return { isLoading, error, data };
};
