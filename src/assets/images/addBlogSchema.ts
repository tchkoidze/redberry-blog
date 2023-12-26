import * as yup from "yup";

const blogSchema = yup.object({
  author: yup
    .string()
    .min(4, "min 4 symbol")
    .matches(/\b\w+\b.*\b\w+\b/, "Must contain at least two words")
    .test(
      "georgianAlphabet",
      "Must contain only Georgian alphabet characters",
      (value) => {
        // Replace this regex with the appropriate Georgian alphabet regex
        const georgianAlphabetRegex = /^[ა-ჰ]+$/;
        return georgianAlphabetRegex.test(value);
      }
    ),
});

///^(\p{L}+\s*){2,}$/,
