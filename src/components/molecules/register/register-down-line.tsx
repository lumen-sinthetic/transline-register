import MapPin from "@components/atoms/icons/map-pin";
import Truck from "@components/atoms/icons/truck";
import { cn } from "@shared/lib/utils";

function RegisterDownLine() {
  return (
    <>
      <Truck
        className={cn(
          "absolute text-primary lg:text-white left-4 sm:left-8 lg:left-16",
          "w-16 sm:w-24 lg:w-auto bottom-8 sm:bottom-14 lg:bottom-24"
        )}
      />
      <MapPin
        className={cn(
          "absolute right-4 sm:right-8 lg:right-16",
          "w-14 sm:w-20 lg:w-auto bottom-8 sm:bottom-14 lg:bottom-24"
        )}
      />

      <div className="absolute w-full inset-x-0 flex h-1 bottom-6 sm:bottom-10 lg:bottom-16">
        <div className="basis-1/2 h-full bg-primary lg:bg-white" />
        <div className="basis-1/2 h-full bg-primary" />
      </div>
    </>
  );
}

export default RegisterDownLine;
