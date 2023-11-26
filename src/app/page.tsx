import { Card } from "./components/card";
import { Contract } from "./components/contract";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Section } from "./components/section";
import { Socials } from "./components/socials";

import config from "public/config.json";
import { type ProjectInfo } from "~/app/models/project.model";

export default function HomePage() {
  const projectData = config as ProjectInfo;
  const layout = "xl:px-60 lg:px-20 md:px-20 px-2 max-w-[2000px] m-auto";
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center gap-5 text-black ${layout}`}
    >
      <Header config={projectData} layout={layout} />
      <div id="landing" className="h-[600px] pt-40"></div>
      <div>
        <Socials config={projectData} />
        <Contract contractAddress={projectData.contractAddress} />
      </div>
      <Section.Container id="about">
        <Section.Header title="about" />
        <Section.Body>
          <Section.Article body={projectData.about} />
          <Section.Graphics src="" alt="" height={350} width={500} />
        </Section.Body>
      </Section.Container>
      <Section.Container id="tokenomics">
        <Section.Header title="tokenomics" />
        <Section.Body>
          <Section.Article body="" />
        </Section.Body>
        <Section.Body>
          <Card.Container>
            <Card.Header heading="TAXES" icon="/favicon.ico" />
            <Card.Graphics src="" />
            <Card.Article
              body={`${projectData.taxes.taxFeeOnBuy} / ${projectData.taxes.taxFeeOnSell}`}
            />
          </Card.Container>
          <Card.Container>
            <Card.Header heading="SECURITY" icon="/favicon.ico" />
            <Card.Graphics src="" />
            <Card.Article body="Lock & Renounce" />
          </Card.Container>
          <Card.Container>
            <Card.Header heading="BENEFITS" icon="/favicon.ico" />
            <Card.Graphics src="" />
            <Card.Article body="Benefits" />
          </Card.Container>
        </Section.Body>
      </Section.Container>
      <Footer config={projectData} layout={layout} />
    </main>
  );
}
