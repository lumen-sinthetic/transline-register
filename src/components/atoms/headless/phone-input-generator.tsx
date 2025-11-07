import { maskitoTransform } from "@maskito/core";
import { useMaskito } from "@maskito/react";
import { phoneMask } from "@shared/lib/phone/masks";
import { unmask } from "@shared/lib/phone/tools";
import { refs } from "@shared/lib/refs";
import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ForwardedRef,
  forwardRef,
  memo,
  ReactElement,
  ReactNode,
  RefAttributes,
  useMemo,
} from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";

export interface PhoneInputGeneratorProps<T extends FieldValues>
  extends Omit<
    ComponentPropsWithoutRef<"input">,
    "onChange" | "children" | "value"
  > {
  control: Control<T>;
  name: Path<T>;
  children: (field: ComponentProps<"input">) => ReactNode;
}

function BasePhoneInputGenerator<T extends FieldValues>(
  {
    children,
    defaultValue,
    onInput,
    control,
    name,
    ...props
  }: PhoneInputGeneratorProps<T>,
  forwardedRef: ForwardedRef<HTMLInputElement>
) {
  const {
    field: { value = "", ref, onChange, ...field },
  } = useController({ control, name });

  const maskitoRef = useMaskito({ options: phoneMask });

  const parsedValue = useMemo(() => {
    if (value === undefined) return;

    const result = maskitoTransform(value, phoneMask);

    return result;
  }, [value]);

  return (
    <>
      {children({
        ref: refs<HTMLInputElement>(forwardedRef, maskitoRef, ref),
        value: parsedValue,
        onInput: e => {
          const val = unmask(e.currentTarget.value);
          onChange(val);
        },
        type: "tel",
        inputMode: "tel",
        ...props,
        ...field,
      })}
    </>
  );
}

BasePhoneInputGenerator.displayName = "BasePhoneInputGenerator";

export default memo(forwardRef(BasePhoneInputGenerator)) as <
  T extends FieldValues,
>(
  props: PhoneInputGeneratorProps<T> & RefAttributes<HTMLInputElement>
) => ReactElement;
