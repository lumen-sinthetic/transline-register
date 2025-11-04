import { HeadlessInput } from "@components/atoms/headless/headless-input";
import {
  InputWrapper,
  InputWrapperParams,
} from "@components/atoms/headless/input-wrapper";
import { ComponentProps, forwardRef } from "react";

interface InputProps extends ComponentProps<"input">, InputWrapperParams {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      description,
      labelClassName,
      errorClassName,
      wrapperClassName,
      descriptionClassName,
      ...res
    },
    ref
  ) => (
    <InputWrapper
      label={label}
      error={error}
      description={description}
      labelClassName={labelClassName}
      errorClassName={errorClassName}
      wrapperClassName={wrapperClassName}
      descriptionClassName={descriptionClassName}
    >
      <HeadlessInput
        ref={ref}
        isError={!!error}
        {...res}
      />
    </InputWrapper>
  )
);

Input.displayName = "Input";

export default Input;
