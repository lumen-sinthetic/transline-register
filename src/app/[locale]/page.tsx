import RegisterDownLine from "@components/molecules/register-down-line";
import PhoneRegister from "@components/organisms/phone-register";
import WelcomeBlock from "@components/organisms/welcome-block";
import { getCountries } from "@entities/countries/api/countries.actions";
import CountriesProvider from "@entities/countries/context/countries.context";

async function Register() {
  const countries = await getCountries();

  return (
    <CountriesProvider countries={countries}>
      <div className="flex h-screen">
        <WelcomeBlock className="basis-1/2" />
        <PhoneRegister classname="basis-1/2" />
        <RegisterDownLine />
      </div>
    </CountriesProvider>
  );
}

export default Register;
