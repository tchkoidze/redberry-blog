type Option = {
  value: string;
  label: string;
};

export type BlogForm = {
  dropzone_file: null;
  author: string;
  header: string;
  date: string;
  category_options: Option[];
  email: string;
};
