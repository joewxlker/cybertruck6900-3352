import Image from "next/image";
import { type FC, type ReactNode } from "react";

const Container: FC<{ id: string; children: ReactNode }> = ({
  id,
  children,
}) => {
  return (
    <section className="flex w-full flex-col gap-5 py-20" id={id}>
      {children}
    </section>
  );
};

const Header: FC<{ title: string }> = ({ title }) => {
  return (
    <div className="flex w-full flex-row items-center py-12">
      <h2 className="font-heading text-4xl text-t2">
        {title[0]?.toUpperCase()}
        {title.slice(1)}
      </h2>
    </div>
  );
};

const Body: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-5 lg:justify-between xl:justify-between">
      {children}
    </div>
  );
};

const Article: FC<{
  body: string;
  link?: { title: string; href: string };
  title?: string;
}> = ({ body }) => {
  return (
    <article className="flex w-[500px] max-w-[100vw] flex-auto items-center justify-center py-5 font-body">
      <p className="font-body text-2xl text-t1">{body}</p>
    </article>
  );
};

const Graphics: FC<{
  src: string;
  height: number;
  width: number;
  alt: string;
}> = ({ src, alt }) => {
  return (
    <div className={`flex w-[500px] max-w-[90vw] flex-row`}>
      <Image src={src} height={300} width={500} alt={alt} />
    </div>
  );
};

export const Section = {
  Container,
  Header,
  Article,
  Graphics,
  Body,
};
