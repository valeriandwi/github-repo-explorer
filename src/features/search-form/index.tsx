import { Button, Collapse, Input } from "antd";
import React from "react";
import RepositoryList from "./components/repository-list";

const SearchForm: React.FC = () => {
  return (
    <div className="flex flex-col space-y-2">
      <div>
        <Input
          placeholder="Search Username..."
          size="large"
          className="!mb-2"
        />
        <Button size="large" className="w-full bg-blue-200">
          Search
        </Button>
      </div>
      <div>
        <span className="font-bold">Showing users for results ""</span>
        <Collapse
          collapsible="header"
          defaultActiveKey={["1"]}
          className="!mt-2"
          items={[
            {
              key: "1",
              label: "This panel can only be collapsed by clicking text",
              children: <RepositoryList />,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default SearchForm;
