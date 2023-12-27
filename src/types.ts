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
  dropzone_file: null;
  author: string;
  header: string;
  description: string;
  date: string;
  category_options: CustomObject[];
  email: string;
};
