import { redirect } from "next/navigation";

async function Home() {
  redirect("/register");
}

export default Home;
