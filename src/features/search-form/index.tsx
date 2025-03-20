import React from "react";
import SearchUserForm from "./components/search-form";
import { useUserStore } from "@/services/stores/user.store";
import { useGetUsers } from "@/services/api/api-hooks/user";
import UserList from "./components/user-list";
import NotFound from "@/components/not-found";

const SearchForm: React.FC = () => {
  const { data, searchValue } = useUserStore();
  const [searchedUser, setSearchedUser] = React.useState<string>("");

  const {
    mutate: getUserMutate,
    isPending: isLoading,
    error,
  } = useGetUsers({ username: searchValue });

  const onSearchButtonClick = () => {
    getUserMutate();
    setSearchedUser(searchValue);
  };

  return (
    <div className="flex flex-col space-y-4">
      <SearchUserForm
        onSearchButtonClick={onSearchButtonClick}
        isLoading={isLoading}
      />
      <div>
        {error && <span className="text-red-500">{error.message}</span>}
        {data?.items && data?.items?.length === 0 && (
          <NotFound message="User Not Found" />
        )}
        {data?.items && data?.items.length > 0 && (
          <UserList isLoading={isLoading} searchedUser={searchedUser} />
        )}
      </div>
    </div>
  );
};

export default SearchForm;
