"use client"

import { useDisconnect, type SmartContract, useContract, useContractEvents, type ContractEvent, useContractWrite } from "@thirdweb-dev/react";
import Image from "next/image"
import { type ChangeEvent, type FC, useCallback, useEffect, useState } from "react"
import { type BaseContract, ethers, utils } from "ethers";
import { DappState, useDappForm } from "../hooks/form";
import { DappFormComponent } from "./form.component";
import { DappHeaderComponent } from "./header.component";
import { type SupportedChainIds, trickOrTreatAbi, trickOrTreatAddresses, callMethodNames, callEventNames } from "../constants";
import { ResultsComponent } from "./results.component";

export const Dapp: FC<{ chainId: SupportedChainIds;}> = ({ chainId }) => {

    const [eventData, setEventData] = useState<ContractEvent<Record<string, unknown>>[] | undefined>();

    const form = useDappForm(chainId);
    const disconnect = useDisconnect();
    const { contract } = useContract(trickOrTreatAddresses[chainId], trickOrTreatAbi);
    const events = useContractEvents(contract, callEventNames[chainId]);

    const { mutateAsync, isLoading, error } = useContractWrite(contract,callMethodNames[chainId]);

    useEffect(() => {
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        const playerData = events.data?.filter((data:ContractEvent<Record<string, any>>) => data.data.player === form.form.spenderAddress);
        setEventData(playerData);
    }, [events.data, form.form.spenderAddress]);

    const updateAmount = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if(!Number.isNaN(Number(event.target.value))){
            form.updateForm({ amount: Number(event.target.value)})
        }
    }, [form]);

    const setAmountAsPercentage = useCallback((percentage: number) => {
        if(!!form.form.spenderBalance){
            form.updateForm({amount : form.form.spenderBalance * percentage});
        }
    }, [form]);
    
    const onSubmit = useCallback((contract: SmartContract<BaseContract>) => {
        if(form.form.amount){
            form.updateState(DappState.PENDING_METAMASK);
            mutateAsync({
                args: [ethers.utils.parseUnits(form.form.amount.toFixed(9), 'gwei')],
                overrides: {
                  gasLimit: 200000, // override default gas limit
                },
            }).then(() => {
                form.updateBalances();
                form.updateForm({ amount: 0 });
                form.updateState(DappState.INVALID_PARAMS);
            })
            .catch((err: unknown) => {
                console.log(err);
                form.updateState(DappState.ERROR);
            });
        }
    }, [form]);

    const onApprove = useCallback((contract: SmartContract<BaseContract>) => {
        contract
        .call("trickOrTreat", [])
        .then(() => {
            form.updateBalances();
            form.updateState(DappState.INVALID_PARAMS);
        })
        .catch((err: unknown) => {
            console.log(err);
            form.updateState(DappState.ERROR);
        });
    }, [form]);

    const handleError = useCallback((err: unknown) => {
        console.log(err);
        form.updateState(DappState.ERROR);
    },[form])

    const onDisconnect = useCallback(() => {
        void disconnect();
    }, [disconnect]);

    return (
        <div id="dapp" className={`w-full flex flex-col bg-b3 overflow-clip border-[1px] border-opacity-30 border-t1 shadow-black shadow-lg p-4 max-w-[100vw]`}>
            <DappHeaderComponent 
                onDisconnect={onDisconnect} 
                address={form.form.spenderAddress ?? ''}/>
            {!form.form.loading && form.state !== DappState.PENDING && form.state !== DappState.PENDING_METAMASK &&  <div className="flex flex-row xl:flex-nowrap lg:flex-nowrap flex-wrap gap-5 min-h-[300px]">
                <div className="w-full flex flex-col px-2 py-3 bg-p1 shadow-inner shadow-black bg-b3 min-w-[15rem]">
                    <DappFormComponent
                        chainId={chainId}
                        onError={handleError}
                        onSetAmountAsPercentage={setAmountAsPercentage} 
                        onSubmit={onSubmit}
                        onApprove={onApprove}
                        onUpdateAmount={updateAmount} 
                        form={form}/>
                </div>
                <div className="w-full flex flex-col bg-p1 justify-start shadow-inner items-start min-w-[15rem] overflow-auto">
                    <ResultsComponent chainId={chainId} eventData={eventData}/>
                </div>
            </div>}
            {!form.form.loading && form.state === DappState.PENDING &&  <div className="flex flex-row flex-wrap gap-5 h-[300px]">
                
            </div>}
            {!form.form.loading && form.state === DappState.PENDING_METAMASK &&  <div className="opacity-50 flex flex-col justify-center items-center gap-5 h-[300px]">
                <div className='p-5'>
                    <Image className='animate-spin' src='/icons/spinner.svg' alt='' height={200} width={200} />
                </div>
                <p className="text-xl font-body text-white">Confirm the transaction using your wallet provider</p>
            </div>}
            {form.form.loading && <div className="flex flex-row flex-wrap gap-5 justify-center items-center p-12">
                <Image className='animate-spin opacity-50' src='/icons/spinner.svg' alt='' height={250} width={250} />
            </div>}
        </div>
    )
}