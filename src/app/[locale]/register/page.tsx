import RegisterDownLine from "@components/molecules/register/register-down-line";
import WelcomeBlock from "@components/organisms/register/welcome-block";
import RegisterProgress from "@components/templates/register-progress";
import { getCountries } from "@entities/countries/api/countries.actions";
import CountriesProvider from "@entities/countries/context/countries.context";
import { cookies } from "next/headers";

async function Register() {
  const countries = await getCountries();
  const cookiesStore = await cookies();

  return (
    <CountriesProvider countries={countries}>
      <main className="flex min-h-screen lg:h-screen relative flex-col lg:flex-row">
        <WelcomeBlock className="h-fit lg:basis-1/2 lg:h-full" />
        <RegisterProgress
          step={Number(cookiesStore.get("x-register-step")?.value || 1)}
          temporaryRegisterData={JSON.parse(
            cookiesStore.get("x-register-data")?.value || "{}"
          )}
        />
        <RegisterDownLine />
      </main>
    </CountriesProvider>
  );
}

export default Register;
