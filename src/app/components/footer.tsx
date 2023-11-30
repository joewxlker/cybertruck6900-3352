import { type FC } from "react";
import { Contract } from "./contract";
import { Socials } from "./socials";
import { type ProjectInfo } from "~/app/models/project.model";
import { Button } from "./button";

export const Footer: FC<{ layout: string; config: ProjectInfo }> = ({
  config,
}) => {
  return (
    <footer
      id="footer"
      className={`py-80 w-screen relative flex flex-col justify-center items-center`}
    >
      <Button href="" size="big" text="JOIN US"/>
      <div className={`absolute bottom-0 w-screen gap-6 py-12 flex-col items-center justify-center flex backdrop-blur-sm`}>
        <Contract contractAddress={config.contractAddress} />
        <Socials config={config} />
      </div>
    </footer>
  );
};
