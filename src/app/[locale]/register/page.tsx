import LangSwitcher from "@components/molecules/lang-switcher";
import RegisterDownLine from "@components/molecules/register/register-down-line";
import ThemeSwitcher from "@components/molecules/theme-switcher";
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
      <main className="flex min-h-screen lg:h-screen relative flex-col lg:flex-row dark:bg-charcoal">
        <div className="absolute top-6 sm:top-10 z-10 flex gap-2 right-4 sm:right-8 lg:right-16">
          <ThemeSwitcher darker />

          <LangSwitcher
            textClassName="text-white lg:text-charcoal dark:text-white rounded-md"
            activeTextClassName="bg-white lg:bg-transparent !text-primary"
          />
        </div>

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
