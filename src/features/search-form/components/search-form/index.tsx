import { useUserStore } from "@/services/stores/user.store";
import { Button, Input } from "antd";
import React from "react";

interface SearchUserFormProps {
  onSearchButtonClick: () => void;
  isLoading: boolean;
}

const SearchUserForm: React.FC<SearchUserFormProps> = ({
  onSearchButtonClick,
  isLoading,
}) => {
  const { setSearchValue } = useUserStore();

  return (
    <div>
      <Input
        placeholder="Search Username..."
        size="large"
        className="!mb-4"
        onChange={(e) => setSearchValue(e.target.value)}
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
  );
};

export default SearchUserForm;
