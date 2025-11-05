import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/atoms/select";
import { useCountries } from "@entities/countries/context/countries.context";
import Image from "next/image";
import { memo } from "react";

interface CountriesSelectProps {
  onChange?: (code: string, prefix: string) => void;
}

function CountriesSelect({ onChange }: CountriesSelectProps) {
  const countries = useCountries();

  return (
    <Select
      defaultValue={"KZ,+7"}
      onValueChange={v => {
        const data = v.split(",") as [string, string];
        onChange?.(...data);
      }}
    >
      <SelectTrigger className="h-full absolute inset-y-0 left-0 border-0 outline-none ring-none w-max">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="w-max max-h-96">
        <SelectGroup>
          {countries.map(item => (
            <SelectItem
              value={`${item.cca2},${item.idd.root}`}
              key={item.cca2}
            >
              <div className="flex gap-2 flex-row shrink-0">
                <Image
                  width={30}
                  height={15}
                  alt={item.cca3}
                  src={item.flags.svg}
                />
                {item.idd.root}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default memo(CountriesSelect);
