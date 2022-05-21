import React from "react";

interface RenderIfProps {
  render: boolean;
  children: React.ReactNode;
}

const RenderIf: React.FC<RenderIfProps> = ({ render, children }) => {
  return <>{render && children}</>;
};

export default RenderIf;
