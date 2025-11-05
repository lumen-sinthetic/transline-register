import RegisterDownLine from "@components/molecules/register-down-line";
import WelcomeBlock from "@components/organisms/register/welcome-block";
import RegisterProgress from "@components/templates/RegisterProgress";
import { getCountries } from "@entities/countries/api/countries.actions";
import CountriesProvider from "@entities/countries/context/countries.context";
import { cookies } from "next/headers";

async function Register() {
  const countries = await getCountries();
  const cookiesStore = await cookies();

  return (
    <CountriesProvider countries={countries}>
      <div className="flex h-screen">
        <WelcomeBlock className="basis-1/2" />
        <RegisterProgress
          step={Number(cookiesStore.get("x-register-step")?.value || 1)}
          temporaryRegisterData={JSON.parse(
            cookiesStore.get("x-register-data")?.value || "{}"
          )}
        />
        <RegisterDownLine />
      </div>
    </CountriesProvider>
  );
}

export default Register;
