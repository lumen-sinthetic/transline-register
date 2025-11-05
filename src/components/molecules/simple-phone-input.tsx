import { HeadlessInput } from "@components/atoms/headless/headless-input";
import {
  InputWrapper,
  InputWrapperParams,
} from "@components/atoms/headless/input-wrapper";
import { refs } from "@shared/lib/refs";

import { maskitoTransform } from "@maskito/core";
import { useMaskito } from "@maskito/react";
import { emptyMask } from "@shared/lib/phone/empty-mask";
import { cn } from "@shared/lib/utils";
import {
  ComponentProps,
  ForwardedRef,
  forwardRef,
  memo,
  ReactElement,
  RefAttributes,
  useMemo,
  useState,
} from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import CountriesSelect from "./countries-select";
import { unmask } from "@shared/lib/phone/tools";

interface InputProps<T extends FieldValues>
  extends ComponentProps<"input">,
    Omit<InputWrapperParams, "error"> {
  control?: Control<T>;
  name: Path<T>;
}

function renderer<T extends FieldValues>(
  {
    label,
    description,
    labelClassName,
    errorClassName,
    wrapperClassName,
    descriptionClassName,
    name,
    control,
    className,
    ...res
  }: InputProps<T>,
  forwardedRef: ForwardedRef<HTMLInputElement>
) {
  const {
    field: { ref, onChange, value = "", ...field },
    fieldState: { error },
  } = useController({ control, name });

  const [selectedCountry, setSelectedCountry] = useState("+7");
  const maskitoRef = useMaskito({ options: emptyMask });

  const inputValue = useMemo(() => {
    const cleared = value.replace(selectedCountry, "");
    return maskitoTransform(cleared, emptyMask);
  }, [value, selectedCountry]);

  return (
    <InputWrapper
      label={label}
      error={error?.message}
      description={description}
      labelClassName={labelClassName}
      errorClassName={errorClassName}
      wrapperClassName={wrapperClassName}
      descriptionClassName={descriptionClassName}
    >
      <CountriesSelect
        onChange={(_, code) => {
          onChange(unmask(value.replace(selectedCountry, code)));
          setSelectedCountry(code);
        }}
      />
      <HeadlessInput
        ref={refs(forwardedRef, ref, maskitoRef)}
        type="tel"
        autoComplete="tel"
        isError={!!error}
        placeholder="(000) 000-00-00"
        className={cn("pl-24", className)}
        value={inputValue}
        onChange={e => {
          const res = unmask(selectedCountry + e.target.value);
          onChange(res);
        }}
        {...field}
        {...res}
      />
    </InputWrapper>
  );
}

export default memo(forwardRef(renderer)) as <T extends FieldValues>(
  props: InputProps<T> & RefAttributes<HTMLInputElement>
) => ReactElement;
