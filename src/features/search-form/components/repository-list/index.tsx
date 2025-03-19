import StarIcon from "@/assets/icons/starIcon";
import { useGetRepositoryPerUser } from "@/services/api/api-hooks/repositories";
import { Card, Skeleton, Space, Typography } from "antd";
import React from "react";

interface RepositoryListProps {
  username: string;
}

const RepositoryList: React.FC<RepositoryListProps> = ({ username }) => {
  const { data, isLoading } = useGetRepositoryPerUser({ username });

  return (
    <>
      {isLoading ? (
        <Space className="w-full" direction="vertical">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index}>
              <Skeleton active />
            </Card>
          ))}
        </Space>
      ) : (
        <Space direction="vertical">
          {data?.map(({ name, stargazers_count, description }) => (
            <Card>
              <div className="flex flex-row justify-between">
                <Typography className="font-semibold mb-2">{name}</Typography>
                <div className="flex flex-row space-x-2 items-center">
                  <Typography>{stargazers_count ?? "0"}</Typography>{" "}
                  <StarIcon />
                </div>
              </div>
              <Typography className="text-gray-400">
                {description ?? "-"}
              </Typography>
            </Card>
          ))}
        </Space>
      )}
    </>
  );
};

export default RepositoryList;
