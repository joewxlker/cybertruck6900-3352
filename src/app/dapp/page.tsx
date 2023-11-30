import { Dapp } from "./components/dapp.component";
import { DappHeader } from "./components/header";
import { CHAIN_ID } from "./constants";
import { DappWrapper } from "./dappWrapper";


export default function HomePage() {
    
  const layout = "px-2 max-w-[2000px] m-auto xl:px-12 lg:px-12";

  return (
    <main className={`${layout} flex min-h-screen flex-col items-center justify-center xl:gap-20 lg:gap-5 gap-5 text-black`}>
      <DappHeader layout={layout} />
      <DappWrapper>
        <Dapp chainId={CHAIN_ID} />
      </DappWrapper>
    </main>
  );
}


