import NotFoundIcon from "@/assets/icons/notFound";
import { Typography } from "antd";
import React from "react";

interface NotFoundProps {
  message?: string;
}

const NotFound: React.FC<NotFoundProps> = ({ message }) => {
  return (
    <div className="flex justify-center items-center flex-col">
      <NotFoundIcon />
      <Typography>{message}</Typography>
    </div>
  );
};

export default NotFound;
