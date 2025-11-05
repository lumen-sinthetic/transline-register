import { Headline } from "@components/atoms/headline";

interface RegsiterTextProps {
  title: string;
  description: string;
}

function RegisterText({ title, description }: RegsiterTextProps) {
  return (
    <div className="head space-y-2">
      <Headline>{title}</Headline>
      <p className="font-light">{description}</p>
    </div>
  );
}

export default RegisterText;
