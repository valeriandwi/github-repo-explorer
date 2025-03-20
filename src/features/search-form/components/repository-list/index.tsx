import StarIcon from "@/assets/icons/starIcon";
import NotFound from "@/components/not-found";
import { useGetRepositoryPerUser } from "@/services/api/api-hooks/repositories";
import { Card, Skeleton, Space, Typography } from "antd";
import React from "react";

interface RepositoryListProps {
  username: string;
}

const RepositoryList: React.FC<RepositoryListProps> = ({ username }) => {
  const { data, isLoading, error } = useGetRepositoryPerUser({ username });

  return (
    <>
      {isLoading ? (
        <Space className="w-full" direction="vertical">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} data-testid="skeleton">
              <Skeleton active />
            </Card>
          ))}
        </Space>
      ) : (
        <>
          {error && <span className="text-red-500">{error.message}</span>}
          {data && data?.length === 0 && (
            <NotFound message="Repositories Not Found" />
          )}
          {data &&
            data?.length > 0 &&
            data?.map(({ id, name, stargazers_count, description }) => (
              <div className="mt-2">
                <Card key={id}>
                  <div className="flex flex-row justify-between">
                    <Typography className="font-semibold mb-2">
                      {name}
                    </Typography>
                    <div className="flex flex-row space-x-2 items-center">
                      <Typography>{stargazers_count ?? "0"}</Typography>{" "}
                      <StarIcon />
                    </div>
                  </div>
                  <Typography className="text-gray-400">
                    {description ?? "-"}
                  </Typography>
                </Card>
              </div>
            ))}
        </>
      )}
    </>
  );
};

export default RepositoryList;
