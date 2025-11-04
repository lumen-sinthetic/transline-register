import { HeadlessTextarea } from "@components/atoms/headless/headless-textarea";
import {
  InputWrapper,
  InputWrapperParams,
} from "@components/atoms/headless/input-wrapper";
import { ComponentProps, forwardRef } from "react";

interface TextareaProps
  extends ComponentProps<"textarea">,
    InputWrapperParams {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
      <HeadlessTextarea
        ref={ref}
        isError={!!error}
        {...res}
      />
    </InputWrapper>
  )
);

Textarea.displayName = "Input";

export default Textarea;
