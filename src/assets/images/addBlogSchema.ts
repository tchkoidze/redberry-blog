import * as yup from "yup";

const blogSchema = yup.object({
  author: yup
    .string()
    .min(4, "min 4 symbol")
    .matches(/\b\w+\b.*\b\w+\b/, "Must contain at least two words"),
});

export default blogSchema;
///^(\p{L}+\s*){2,}$/,
