import { useEffect, useState } from "react";
import axios from "axios";
import { PostType } from "model";

const useGetFormPostData = ({ id }: { id: string | undefined }) => {
  const [formData, setFormData] = useState<PostType | {}>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      const { data, status } = await axios.get<PostType>(
        `http://localhost:5000/posts/${id}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (data) setFormData(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
  };
};

export default useGetFormPostData;
