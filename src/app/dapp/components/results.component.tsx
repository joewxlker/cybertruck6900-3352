import { type ContractEvent } from "@thirdweb-dev/sdk";
import { type BigNumber, ethers } from "ethers";
import { type FC } from "react"

interface ResultsProps {
    eventData: ContractEvent<Record<string, unknown >>[] | undefined;
}
export const ResultsComponent: FC<ResultsProps> = ({ eventData }) => {
    return (
        <>
            {!eventData && <div className="h-full w-full flex justify-center items-center">
                <p className='text-white font-body opacity-70'>Recent spins will show up here...</p>
            </div>}
            {eventData && <div className="flex flex-col gap-4 p-2 w-full">{eventData.map(data => (
                <div key={data.transaction.transactionHash} className={`${data.data.success ? 'bg-emerald-500' : 'bg-red-500'} w-full rounded p-2`}>
                    <p className="text-white text-sm font-body">{data.data.player as string}</p>
                    <p className="text-white text-sm font-body">Amount : {ethers.utils.formatUnits(data.data.amount as BigNumber, 9)}</p>
                    <p className="text-white text-xs font-body">Txn : {data.transaction.transactionHash}</p>
                </div>
            ))}</div>}
        </>
    )
}