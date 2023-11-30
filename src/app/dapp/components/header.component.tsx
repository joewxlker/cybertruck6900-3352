import Image from "next/image";
import { type FC, useCallback } from "react";

interface DappHeaderProps {
    onOpen: () => void;
    onClose: () => void;
    onDisconnect: () => void;
    address?: string;
    module?: boolean;
}
export const DappHeaderComponent: FC<DappHeaderProps> = ({ address, onDisconnect, onClose, onOpen, module }) => {
    const close = useCallback(() => onClose(), [onClose]);
    const open = useCallback(() => onOpen(), [onOpen]);
    const disconnect = useCallback(() => onDisconnect(), [onDisconnect]);
    return (
        <div className='w-full py-2 flex px-2 flex-row items-center gap-5 justify-between'>
            <h2 className='text-white font-heading text-3xl'>Trick or Treat</h2>
            <div className='flex flex-row gap-2'>
                <div className="flex flex-row items-center rounded bg-b1 shadow-black shadow-sm p-2">
                    <p className='text-white text-xl font-body'>{address?.slice(0,10)}...{address?.slice(38,50)}</p>
                </div>
                {address && <button onClick={disconnect} className='p-2 shadow-black shadow-sm rounded bg-b1 flex justify-center items-center'>
                    <Image src='/icons/on.svg' alt='' height={20} width={20} />
                </button>}
                {module && <button onClick={close} className='p-2 shadow-black shadow-sm rounded bg-b1 flex justify-center items-center'>
                    <Image src='/brands/x.svg' alt='' height={20} width={20} />
                </button>}
                {!module && <button onClick={open} className='p-2 shadow-black shadow-sm rounded bg-b1 flex justify-center items-center'>
                    <Image src='/assets/open.svg' alt='' height={20} width={20} />
                </button>}
            </div>
        </div>
    )
}