import PhoneInputGenerator from "@components/atoms/headless/phone-input-generator";
import { cn } from "@shared/lib/utils";
import { X } from "lucide-react";
import { HTMLInputTypeAttribute } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";

interface UserFieldProps<T extends FieldValues> {
  label: string;
  control: Control<T>;
  name: Path<T>;
  type?: HTMLInputTypeAttribute;
}

function UserField<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
}: UserFieldProps<T>) {
  const {
    field: { value = "", ...field },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <label className="grid grid-cols-[160px_1fr] items-center px-6 py-3">
      <div
        className={cn("text-sm text-charcoal-400 cursor-pointer", {
          "text-red-500": error,
        })}
      >
        {label}
      </div>
      <div className="flex items-center gap-2 relative">
        {type === "tel" ? (
          <PhoneInputGenerator
            control={control}
            name={name}
          >
            {field => (
              <input
                {...field}
                className="outline-none focus:outline-none bg-transparent absolute inset-0"
              />
            )}
          </PhoneInputGenerator>
        ) : (
          <input
            {...field}
            value={value}
            type={type}
            className="outline-none focus:outline-none bg-transparent absolute inset-0"
          />
        )}

        <div
          className={cn("opacity-0 min-w-[3ch]", { "px-2": type === "tel" })}
        >
          a{value}
        </div>

        <button
          type="button"
          onClick={() => field.onChange("")}
          aria-label="clear"
          className="relative z-10"
        >
          <X className="size-4 text-charcoal-400" />
        </button>
      </div>

      {error && <span className="text-xs text-red-500">{error.message}</span>}
    </label>
  );
}

export default UserField;
