import React, { useEffect, memo } from "react";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
  Button,
  Spinner,
  Box,
} from "@chakra-ui/react";
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from "services/postsApi";
import { useGetFormPostData } from "hooks";
import RenderIf from "components/Common/RenderIf";

interface Inputs {
  creator: string;
  title: string;
  message: string;
  tags: string;
  selectedFile: string;
}

interface FormProps {
  onClose: () => void;
  postId?: string | undefined;
}

const Form: React.FC<FormProps> = ({ onClose, postId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const [createPost, { isLoading }] = useCreatePostMutation();
  const [updatePost, { isLoading: isLoadingUpdate }] = useUpdatePostMutation();

  const { formData, isLoading: formDataIsLoading } = useGetFormPostData({
    id: postId,
  });

  useEffect(() => {
    if (formData) reset(formData);
  }, [formData]);

  const handleCreatePost = async (data: Inputs) => {
    if (postId) {
      await updatePost({ _id: postId, ...data });
    } else {
      await createPost(data);
    }

    onClose();
    reset();
  };

  const Form = (
    <form onSubmit={handleSubmit(handleCreatePost)}>
      <Stack direction="column">
        <FormControl isInvalid={errors.creator ? true : false}>
          <Input
            id="creator"
            type="text"
            placeholder="Creator"
            {...register("creator", { required: true })}
          />
          {errors.creator && (
            <FormErrorMessage>Creator is required.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={errors.title ? true : false}>
          <Input
            id="title"
            type="text"
            placeholder="Title"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <FormErrorMessage>Title is required.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={errors.message ? true : false}>
          <Input
            id="message"
            type="text"
            placeholder="Message"
            {...register("message", { required: true })}
          />
          {errors.message && (
            <FormErrorMessage>Message is required.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl>
          <Input
            id="tags"
            type="text"
            placeholder="Tags"
            {...register("tags")}
          />
        </FormControl>
        <FormControl>
          <Input
            id="selectedFile"
            type="text"
            placeholder="Image Url"
            {...register("selectedFile")}
          />
        </FormControl>
        <Button
          isLoading={postId ? isLoadingUpdate : isLoading}
          loadingText="Posting"
          colorScheme="teal"
          type="submit"
        >
          {postId ? "Update" : "Post"}
        </Button>
      </Stack>
    </form>
  );

  return (
    <>
      <RenderIf render={postId && formDataIsLoading ? true : false}>
        <Box display={"flex"} p={4} flex={1} justifyContent="center">
          <Spinner />
        </Box>
      </RenderIf>
      <RenderIf render={postId && !formDataIsLoading ? true : false}>
        {Form}
      </RenderIf>
      <RenderIf render={!postId}>{Form}</RenderIf>
    </>
  );
};

export default Form;
