import { HeadlessInput } from "@components/atoms/headless/headless-input";
import {
  InputWrapper,
  InputWrapperParams,
} from "@components/atoms/headless/input-wrapper";
import { cn } from "@shared/lib/utils";
import { ComponentProps, forwardRef } from "react";

interface InputProps extends ComponentProps<"input">, InputWrapperParams {}

const SimplePhoneInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      description,
      labelClassName,
      errorClassName,
      wrapperClassName,
      descriptionClassName,
      className,
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
        type="tel"
        autoComplete="tel"
        isError={!!error}
        placeholder="(000) 000-00-00"
        className={cn("pl-12", className)}
        {...res}
      />
    </InputWrapper>
  )
);

SimplePhoneInput.displayName = "SimplePhoneInput";

export default SimplePhoneInput;
