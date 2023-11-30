import { type FC } from "react";
import { icons } from "./icons";
import { type ProjectInfo } from "../models/project.model";

export const Socials: FC<{ config: ProjectInfo }> = ({ config }) => {
  return (
    <div className="flex w-full flex-row items-center justify-center gap-5 py-2">
      {icons.map((icon, idx) => (
        <div
          key={idx}
          className="h-7 w-7"
        >
          {icon({ fill: "#ffffff", config })}
        </div>
      ))}
    </div>
  );
};
