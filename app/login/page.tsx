"use client";

import { Box, FormHelperText, Stack, Typography } from "@mui/material";

import { SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { useReactHookFormWithYup } from "@/app/hooks/useYup";
import { InputText } from "@/app/components/inputText";
import { PasswordField } from "../components/passwordField";
import { LoadingBasic } from "../components/loadingBasic";
import { DynamicButton } from "../components/button";
import { useAuth } from "../hooks/useAuth";

const LoginSchema = yup
  .object({
    email: yup.string().email().required().label("email"),
    password: yup.string().required("No password provided.").label("password"),
  })
  .required();

export default function Login() {
  const { handleLogin, loading } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useReactHookFormWithYup(LoginSchema);

  const submitLogin: SubmitHandler<yup.InferType<typeof LoginSchema>> = (
    data
  ) => {
    handleLogin(data);
  };

  return (
    <>
      {loading ? (
        <LoadingBasic isLoading={loading} />
      ) : (
        <Box borderRadius="7px" p="20px" bgcolor="#fdfdfd" minWidth={"40%"}>
          <Box mb="20px" textAlign="center">
            <Typography variant="h4" mb="20px" color="text.primary">
              Welcome to Admin Centre
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Sign in to continue
            </Typography>
          </Box>
          <Stack gap={2} component="form">
            <Box>
              <Typography variant="subtitle2" color="text.primary" mb="5px">
                Email
              </Typography>
              <InputText
                fullWidth
                control={control}
                placeholder="Enter your email"
                name="email"
                helperText={errors?.email?.message}
              />
            </Box>
            <Box mb="10px">
              <Typography variant="subtitle2" color="text.primary" mb="5px">
                Password
              </Typography>
              <PasswordField
                control={control}
                name="password"
                placeholder="Enter your password"
              />
              <FormHelperText sx={{ ml: "16px", color: "red" }}>
                {errors?.password?.message}
              </FormHelperText>
            </Box>
            <DynamicButton
              text="Sign In"
              preset="fillDarkGrey"
              onClick={handleSubmit(submitLogin)}
            />
          </Stack>
        </Box>
      )}
    </>
  );
}
