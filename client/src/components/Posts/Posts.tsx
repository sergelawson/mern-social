import React, { useState } from "react";
import Post from "./Post/Post";
import { Box, Heading, Stack, Flex, useDisclosure } from "@chakra-ui/react";
import { useGetPostsQuery } from "services/postsApi";
import RenderIf from "components/Common/RenderIf";
import { FormEditModal } from "components/Form";

const Posts: React.FC = () => {
  const { data, isFetching, error, isError, isSuccess } = useGetPostsQuery();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [editPostId, setEditPostId] = useState<string | undefined>(undefined);

  const onEditPost = (id: string | undefined) => {
    setEditPostId(id);
    onOpen();
  };
  return (
    <>
      <FormEditModal isOpen={isOpen} postId={editPostId} onClose={onClose} />

      <Flex p={4}>
        <Box flex={1}>
          <Heading size="sm" textTransform={"uppercase"}>
            Trending Locations
          </Heading>
        </Box>
        <Box flex={2}>
          <Heading size="sm" textTransform={"uppercase"}>
            Posts
          </Heading>

          <RenderIf render={isFetching}>
            <p>Loading</p>
          </RenderIf>

          <RenderIf render={isError}>
            <p>Somthing went wrong</p>
          </RenderIf>

          <RenderIf render={isSuccess}>
            {data?.map((post) => (
              <Post
                onClick={() => onEditPost(post._id)}
                key={post._id}
                title={post.title}
                message={post.message}
                creator={post.creator}
                selectedFile={post.selectedFile}
              />
            ))}
          </RenderIf>
        </Box>
        <Box flex={1}>
          <Heading size="sm" textTransform={"uppercase"}>
            Popular Posts
          </Heading>
        </Box>
      </Flex>
    </>
  );
};

export default Posts;
