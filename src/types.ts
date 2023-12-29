type Option = {
  value: string;
  label: string;
};

type CustomObject = {
  label: string;
  value: number;
  style: {
    color: string;
    backgroundColor: string;
  };
};

export type BlogForm = {
  dropzone_file: File | string | null;

  author: string;
  header: string;
  description: string;
  date: string;
  category_options: Option[];

  email: string;
};

type BlogCategory = {
  id: number;
  name: string;
  text_color: string;
  background_color: string;
};

export type Blog = {
  id: number;
  title: string;
  description: string;
  image: string;
  publish_date: string;
  categories: BlogCategory[];
  author: string;
};
