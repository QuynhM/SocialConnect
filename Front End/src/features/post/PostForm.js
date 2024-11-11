import React, { useCallback } from "react";
import { Box, Card, alpha, Stack } from "@mui/material";
import { FormProvider, FTextField,  } from "../../components/form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { createPost } from "./postSlice";
import { LoadingButton } from "@mui/lab";
import FUploadImage from "../../components/form/FUploadImage";

const yupSchema = Yup.object().shape({
  content: Yup.string().required("Share something !"),
});

const defaultValues = {
  content: "",
  image: "",
};

function PostForm() {
  const { isLoading } = useSelector((state) => state.post);

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;
  const dispatch = useDispatch();

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "image",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const onSubmit = (data) => {
    dispatch(createPost(data)).then(() => reset());
  };

  return (
    <Card sx={{ p: 3, background: "var(--color-card)", boxShadow: "none"  }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FTextField
            name="content"
            multiline
            fullWidth
            rows={4}
            placeholder="What's on your mind ?"
            sx={{
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: alpha("#aaaaaa", 0.32),
              },
              "& ::placeholder": {
                color: "var(--text-color)", 
              },
            }}
          />

          <FUploadImage
            name="image"
            accept="image/*"
            maxSize={3145728}
            onDrop={handleDrop}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              loading={isSubmitting || isLoading}
              sx={{
                "&:hover": {
                  opacity: 0.8,
                  background: "var(--color-primary)"
                },
              }}
            >
              Post
            </LoadingButton>
          </Box>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default PostForm;
