import React from "react";
import { Box, Image, Stack, Flex } from "@chakra-ui/react";
import { PostType } from "model";
import { AiFillEdit } from "react-icons/ai";

const Post: React.FC<PostType> = ({
  title,
  message,
  creator,
  selectedFile,
  createdAt,
  likeCount,
  tags,
  onClick,
}) => {
  return (
    <Box borderRadius="lg" maxW="md" m={4} overflow="hidden" boxShadow="md">
      <Flex
        position={"absolute"}
        maxW="md"
        w="100%"
        justifyContent="space-between"
        p={2}
      >
        <Box as="h4" fontSize={20} color="#FFFFFF" fontWeight="bold">
          {creator}
        </Box>
        <Box
          onClick={onClick}
          color="#FFFFFF"
          transform={"all 0.5s ease"}
          _hover={{ color: "#2D797B" }}
        >
          <AiFillEdit size={22} />
        </Box>
      </Flex>

      <Image src={selectedFile} />
      <Flex p={3}>
        <Box fontWeight="bold">{title}</Box>
      </Flex>
    </Box>
  );
};

export default Post;
