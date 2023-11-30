"use client";

import { type FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "~/app/components/button";

export const DappHeader: FC<{ layout: string }> = ({
  layout,
}) => {
  return (
    <div
      className={`${layout} fixed left-0 right-0 z-50 top-0 flex flex-row backdrop-blur-md py-2 border-b-[1px] border-opacity-30 border-b-t1`}
    >
      <div className="flex-1">
        <Link className="flex w-fit px-2 flex-row items-center" href="/">
          <Image src="/logo-100px.png" className="rounded-full" alt="" height={50} width={50} />
          <Image src='/white-text-180x50px.png' alt='' height={50 * 0.6} width={180 * 0.6} />
        </Link>
      </div>
      <div className="flex-1" />
      <div className="hidden flex-1 flex-row items-center justify-end gap-5 md:flex lg:flex xl:flex">
        <Button internal href="/dapp" text="DAPP" size="small" />
      </div>
    </div>
  );
};
