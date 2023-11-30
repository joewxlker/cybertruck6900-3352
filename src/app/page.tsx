import { Footer } from "./components/footer";
import { Header } from "./components/header";

import config from "public/config.json";
import { type ProjectInfo } from "~/app/models/project.model";
import { Landing } from "./features/landing";
import { About } from "./features/about";
import { Tokenomics } from "./features/tokenomics";

export default function HomePage() {
  
  const projectData = config as ProjectInfo;
  const layout = "px-2 max-w-[2000px] m-auto xl:px-12 lg:px-12";

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center xl:gap-20 lg:gap-5 gap-5 text-black`}>
      <Header config={config} layout={"px-2 max-w-[2000px] m-auto xl:px-12 lg:px-12"} />
      <Landing layout={layout} />
      <About layout={layout} />
      <Tokenomics layout={layout} />
      <Footer config={projectData} layout={layout} />
    </main>
  );
}


