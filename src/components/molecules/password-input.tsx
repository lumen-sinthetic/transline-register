import { HeadlessInput } from "@components/atoms/headless/headless-input";
import {
  InputWrapper,
  InputWrapperParams,
} from "@components/atoms/headless/input-wrapper";
import { Eye, EyeOff } from "lucide-react";
import { ComponentProps, forwardRef, useState } from "react";

interface PasswordInputProps
  extends Omit<ComponentProps<"input">, "type">,
    InputWrapperParams {
  showPassword?: boolean;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      label,
      error,
      description,
      labelClassName,
      errorClassName,
      wrapperClassName,
      descriptionClassName,
      showPassword,
      ...props
    },
    ref
  ) => {
    const [isPasswordHidden, setIsPasswordHidden] = useState(!showPassword);

    return (
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
          type={isPasswordHidden ? "password" : "text"}
          isError={!!error}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          className="top-1/2 p-3 cursor-pointer absolute right-1 -translate-y-1/2"
          onClick={() => setIsPasswordHidden(prev => !prev)}
        >
          {isPasswordHidden ? (
            <Eye className="size-6" />
          ) : (
            <EyeOff className="size-6" />
          )}
        </button>
      </InputWrapper>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
