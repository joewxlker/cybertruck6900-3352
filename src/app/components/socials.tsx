import { FC } from "react";
import { icons } from "./icons";
import { ProjectInfo } from "../models/project.model";

export const Socials: FC<{ config: ProjectInfo }> = ({ config }) => {
  return (
    <div className="flex w-full flex-row items-center justify-center gap-5 py-2">
      {icons.map((icon, idx) => (
        <div
          key={idx}
          className="h-8 w-8 md:h-10 md:w-10 lg:h-10 lg:w-10 xl:h-10  xl:w-10"
        >
          {icon({ fill: "#ffffff", config })}
        </div>
      ))}
    </div>
  );
};
