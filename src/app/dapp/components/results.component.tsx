import { type ContractEvent } from "@thirdweb-dev/sdk";
import { type BigNumber, ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { type FC } from "react"
import { type CHAIN_ID, etherscanUrl } from "../constants";

interface ResultsProps {
    chainId: typeof CHAIN_ID,
    eventData: ContractEvent<Record<string, unknown >>[] | undefined;
}
export const ResultsComponent: FC<ResultsProps> = ({ eventData, chainId }) => {
    return (
        <>
            {eventData && eventData?.length === 0 && <div className="h-full w-full flex justify-center items-center">
                <p className='text-t1 font-body text-xl'>Recent spins will show up here...</p>
            </div>}
            {eventData && eventData?.length > 0 &&
             <div className="flex flex-col gap-4 p-2 w-full h-[300px]">{eventData.map(data => (
                <Link target="_blank" href={`${etherscanUrl[chainId]}/tx/${data.transaction.transactionHash}`} key={data.transaction.transactionHash} className={`${data.data.success ? 'bg-emerald-500' : 'bg-red-500'} w-full p-2 bg-opacity-50`}>
                    <span className="flex flex-row justify-between items-center">
                        <p className="text-t1 text-lg font-body">{(data.data.player as string).slice(0,10)} . . . {(data.data.player as string).slice(38)}</p>
                        <Image className="opacity-50" src='/icons/link.svg' alt='' height={20} width={20} />
                    </span>
                    <p className="text-t1 text-lg font-body">Amount : {ethers.utils.formatUnits(data.data.amount as BigNumber, 9)}</p>
                    <p className="text-t1 text-md font-body">Txn : {data.transaction.transactionHash.slice(0,10)} . . . {data.transaction.transactionHash.slice(50)}</p>
                </Link>))}
            </div>}
        </>
    )
}