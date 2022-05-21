import React from "react";
import { Posts } from "components/Posts";
import { NavBar } from "components/NavBar";
import { Stack } from "@chakra-ui/react";

const App: React.FC = () => {
  return (
    <Stack>
      <NavBar />
      <Posts />
    </Stack>
  );
};

export default App;
