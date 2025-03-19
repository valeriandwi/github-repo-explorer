import { Button, Collapse, Input, Skeleton } from "antd";
import React from "react";
import RepositoryList from "./components/repository-list";
import { useGetUsers } from "@/services/api/api-hooks/user";

const SearchForm: React.FC = () => {
  const [search, setSearch] = React.useState<string>("");
  const {
    mutate: getUserMutate,
    data,
    isPending: isLoading,
  } = useGetUsers({ username: search });

  const onSearchButtonClick = () => {
    getUserMutate();
  };

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <Input
          placeholder="Search Username..."
          size="large"
          className="!mb-4"
          onChange={(e) => setSearch(e.target.value)}
          disabled={isLoading}
        />
        <Button
          size="large"
          className="w-full bg-blue-200"
          onClick={onSearchButtonClick}
          loading={isLoading}
          type="primary"
        >
          Search
        </Button>
      </div>
      <div>
        {data?.items && (
          <span className="font-medium">
            Showing users for results "{search}"
          </span>
        )}
        <div className="mt-2">
          {isLoading ? (
            <Skeleton />
          ) : (
            data?.items &&
            data?.items?.length > 0 &&
            data?.items?.map((value) => (
              <Collapse
                collapsible="header"
                className="!mt-2"
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
    </div>
  );
};

export default SearchForm;
