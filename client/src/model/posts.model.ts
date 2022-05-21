interface PostType {
  _id?: string;
  title: string; // string is shorthand for {type: string}
  message: string;
  creator: string;
  tags?: string;
  selectedFile?: string;
  likeCount?: {
    type: number;
  };
  createdAt?: { type: Date };
  onClick?: () => void;
}

export type { PostType };
