import { type FC } from "react";
import { Contract } from "./contract";
import { Socials } from "./socials";
import { type ProjectInfo } from "~/app/models/project.model";

export const Footer: FC<{ layout: string; config: ProjectInfo }> = ({
  layout,
  config,
}) => {
  return (
    <footer
      className={`flex min-h-[20rem] w-full flex-col items-center justify-center gap-5 ${layout}`}
    >
      <Contract contractAddress={config.contractAddress} />
      <Socials config={config} />
    </footer>
  );
};
