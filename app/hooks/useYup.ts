import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import yup from "yup";

export const useReactHookFormWithYup = <
  TSchema extends Parameters<typeof yupResolver>[0]
>(
  yupSchema: TSchema
) => {
  const {
    control,
    register,
    handleSubmit,
    formState,
    reset,
    getValues,
    setValue,
    watch,
    trigger,
  } = useForm<yup.InferType<TSchema>>({
    resolver: yupResolver(yupSchema),
  });

  return {
    control,
    register,
    handleSubmit,
    formState,
    reset,
    getValues,
    setValue,
    watch,
    trigger,
  };
};
