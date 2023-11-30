import Link from "next/link";
import { type FC } from "react";

export const Button: FC<{ href: string; text: string, size: 'big' | 'small', internal?: boolean }> = ({ href, text, size, internal }) => {
  return (
    <Link href={href} target={internal ? '_self' : '_blank'}>
      <div className="border-[1px] border-t2 px-3 py-1 flex justify-center items-center text-t2 backdrop-blur-sm bg-white bg-opacity-10 shadow-sm shadow-shadow">
        <p className={`
          ${size === 'big' && 'xl:text-3xl lg:text-3xl text-xl'} 
          ${size === 'small' && 'xl:text-2xl lg:text-2xl text-xl'} 
          font-heading 
        `}>{text}</p>
      </div>
    </Link>
  );
};
