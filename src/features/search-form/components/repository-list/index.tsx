import StarIcon from "@/assets/icons/starIcon";
import { Card, Typography } from "antd";
import React from "react";

const RepositoryList: React.FC = () => {
  return (
    <Card>
      <div className="flex flex-row justify-between">
        <Typography className="font-semibold mb-2">Repository Name</Typography>
        <div className="flex flex-row space-x-2 items-center">
          <Typography>2.0</Typography> <StarIcon />
        </div>
      </div>
      <Typography className="text-gray-400">Repository Description</Typography>
    </Card>
  );
};

export default RepositoryList;
