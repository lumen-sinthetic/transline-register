import { forwardRef, ReactNode } from "react";

import clsx from "clsx";

export interface InputWrapperParams {
  /**
   * @description error message
   * @info appears in bottom of the input
   */
  error?: string;

  /**
   * @description label for the input
   * @info appears in top of the input
   */
  label?: string;

  /**
   * @description description for the input
   * @info appears in bottom of the input
   * @remarks only appears if there is no error
   */
  description?: string;

  /**
   * @description className for the wrapper element
   */
  wrapperClassName?: string;

  /**
   * @description className for the description text
   */
  descriptionClassName?: string;

  /**
   * @description className for the label text
   */
  labelClassName?: string;

  /**
   * @description className for the error text
   */
  errorClassName?: string;
}

interface InputWrapperProps extends InputWrapperParams {
  children: ReactNode;
}

/**
 * ### Label wrapper that contains all features for input description
 *
 * You can provide and customize:
 * - label
 * - description
 * - error
 * - wrapper className
 * - label className
 * - description className
 * - error className
 *
 * @example
 * ```tsx
 * <InputWrapper label="Name" description="Enter your name">
 *  <Input />
 * </InputWrapper>
 * ```
 */
const InputWrapper = forwardRef<HTMLLabelElement, InputWrapperProps>(
  (props, ref) => {
    const {
      children,
      error,
      label,
      description,
      wrapperClassName,
      labelClassName,
      descriptionClassName,
      errorClassName,
    } = props;

    return (
      <label
        ref={ref}
        className={clsx(
          "input-wrapper",
          "flex flex-col gap-2",
          wrapperClassName
        )}
      >
        {label && (
          <span
            className={clsx(
              "input-label",
              "text-gray-600 text-sm",
              labelClassName
            )}
          >
            {label}
          </span>
        )}

        <div className="inner-wrapper relative w-full">{children}</div>

        {description && !error && (
          <span
            className={clsx(
              "input-description",
              "text-gray-600 text-xs",
              descriptionClassName
            )}
          >
            {description}
          </span>
        )}

        {error && (
          <span
            className={clsx(
              "input-error",
              "text-xs text-red-500",
              errorClassName
            )}
          >
            {error}
          </span>
        )}
      </label>
    );
  }
);

InputWrapper.displayName = "InputWrapper";

export { InputWrapper };
