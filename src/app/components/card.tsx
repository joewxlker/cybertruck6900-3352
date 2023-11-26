import Image from "next/image";
import { ReactNode, type FC } from "react";

const Container: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex w-full max-w-[100vw] flex-col items-center justify-center gap-3 rounded bg-p1 p-3 text-t1 shadow-sm shadow-shadow md:w-80 lg:w-80 xl:w-80">
      {children}
    </div>
  );
};

const Header: FC<{ heading: string; icon?: string }> = ({ heading, icon }) => {
  return (
    <div className="flex w-full flex-row items-center justify-between py-2">
      <h3 className="font-heading text-3xl">{heading}</h3>
      {icon && <Image alt="" src={icon} height={30} width={30} />}
    </div>
  );
};

const Article: FC<{
  body: string;
  link?: { title: string; href: string };
  title?: string;
}> = ({ body }) => {
  return (
    <article className="flex flex-1 items-center justify-center">
      <p className="font-body text-2xl text-t1">{body}</p>
    </article>
  );
};

const Graphics: FC<{ src: string }> = ({ src }) => {
  return (
    <div className="flex-1">
      <Image src={src} height={150} width={400} alt="" />
    </div>
  );
};

export const Card = {
  Container,
  Header,
  Article,
  Graphics,
};
