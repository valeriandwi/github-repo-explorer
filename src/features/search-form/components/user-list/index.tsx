import React from "react";
import RepositoryList from "../repository-list";
import { useUserStore } from "@/services/stores/user.store";
import { Collapse, Skeleton } from "antd";

interface UserListProps {
  isLoading: boolean;
  searchedUser: string;
}

const UserList: React.FC<UserListProps> = ({ isLoading, searchedUser }) => {
  const { data } = useUserStore();

  return (
    <div>
      <span className="font-medium">
        Showing users for results "{searchedUser}"
      </span>
      <div className="mt-2">
        {isLoading ? (
          <div data-testid="skeleton">
            <Skeleton />
          </div>
        ) : (
          data?.items &&
          data?.items?.length > 0 &&
          data?.items?.map((value) => (
            <Collapse
              key={value.login}
              collapsible="header"
              className="!mt-2"
              data-testid="user-list"
              items={[
                {
                  key: "1",
                  label: value.login,
                  children: <RepositoryList username={value.login} />,
                },
              ]}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default UserList;
