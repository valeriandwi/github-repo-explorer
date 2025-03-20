import React from "react";
import MainLayout from "@/layouts/MainLayout";
import SearchForm from "@/features/search-form";

const SearchPage: React.FC = () => {
  return (
    <MainLayout>
      <SearchForm />
    </MainLayout>
  );
};

export default SearchPage;
