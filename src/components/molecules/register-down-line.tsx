import MapPin from "@components/atoms/icons/map-pin";
import Truck from "@components/atoms/icons/truck";

function RegisterDownLine() {
  return (
    <>
      <Truck className="absolute text-white left-16 bottom-24" />
      <MapPin className="absolute right-16 bottom-24" />

      <div className="absolute w-full inset-x-0 flex h-1 bottom-16">
        <div className="basis-1/2 h-full bg-white" />
        <div className="basis-1/2 h-full bg-primary" />
      </div>
    </>
  );
}

export default RegisterDownLine;
