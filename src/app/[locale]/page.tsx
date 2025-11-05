import RegisterDownLine from "@components/molecules/register-down-line";
import PhoneRegister from "@components/organisms/phone-register";
import WelcomeBlock from "@components/organisms/welcome-block";

export default function Home() {
  return (
    <div className="flex h-screen">
      <WelcomeBlock className="basis-1/2" />
      <PhoneRegister classname="basis-1/2" />
      <RegisterDownLine />
    </div>
  );
}
