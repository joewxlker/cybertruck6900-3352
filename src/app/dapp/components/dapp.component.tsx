import { useAddress, useDisconnect, type SmartContract, useContract, useContractEvents, type ContractEvent } from "@thirdweb-dev/react";
import Image from "next/image"
import { type ChangeEvent, type FC, useCallback, useEffect, useState } from "react"
import { type BaseContract, ethers } from "ethers";
import { DappState, useDappForm } from "../hooks/form";
import { DappFormComponent } from "./form.component";
import { DappHeaderComponent } from "./header.component";
import { trickOrTreatAbi, trickOrTreatAddressV2 } from "../constants";
import { ResultsComponent } from "./results.component";

export const Dapp: FC<{module?: boolean; onClose?: ()=> void; onOpen?: ()=> void}> = ({ module, onClose, onOpen }) => {

    const [eventData, setEventData] = useState<ContractEvent<Record<string, unknown>>[] | undefined>();

    const form = useDappForm();
    const address = useAddress();
    const disconnect = useDisconnect();
    const { contract } = useContract(trickOrTreatAddressV2, trickOrTreatAbi);
    const events = useContractEvents(contract, 'TrickOrTreatResult')

    useEffect(() => {
        const playerData = events.data?.filter(data => data.data.player === form.form.spenderAddress);
        setEventData(playerData);
    }, [events.data, form.form.spenderAddress]);

    const close = useCallback(() => {
        onClose && onClose();
    }, [onClose]);

    const open = useCallback(() => {
        onOpen && onOpen();
    }, [onOpen]);

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
            contract
            .call("trickOrTreat", [ethers.utils.parseUnits(form.form.amount.toFixed(9), 'gwei')])
            .then(() => {
                form.updateBalances();
                form.updateForm({ amount: 0 });
                form.updateState(DappState.INVALID_PARAMS);
            })
            .catch(err => {
                console.log(err);
                form.updateState(DappState.ERROR);
            });
        }
    }, [form]);

    const onApprove = useCallback((contract: SmartContract<BaseContract>) => {
        contract
        .call("trickOrTreat", [])
        .then((data) => {
            console.log(data);
            form.updateBalances();
            form.updateState(DappState.INVALID_PARAMS);
        })
        .catch(err => {
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
        <div className={`${module? 'w-[800px]' : 'w-full'} flex flex-col bg-b3 gradient rounded-xl overflow-clip border-2 border-b2 shadow-black shadow-lg p-4 max-w-[100vw]`}>
            <DappHeaderComponent
                module={module} 
                onClose={close} 
                onOpen={open} 
                onDisconnect={onDisconnect} 
                address={address}/>
            {!form.form.loading && form.state !== DappState.PENDING && form.state !== DappState.PENDING_METAMASK &&  <div className="flex flex-row flex-wrap gap-5 h-[300px]">
                <div className="flex-1 w-full flex flex-col p-5 shadow-md shadow-black bg-b3 gradient-bg rounded min-w-[15rem]">
                    <DappFormComponent
                        onError={handleError}
                        onSetAmountAsPercentage={setAmountAsPercentage} 
                        onSubmit={onSubmit}
                        onApprove={onApprove}
                        onUpdateAmount={updateAmount} 
                        form={form}/>
                </div>
                <div className="flex-1 w-full h-full flex flex-col bg-stone-950 rounded-md justify-start items-start min-w-[15rem] overflow-auto">
                    <ResultsComponent eventData={eventData}/>
                </div>
            </div>}
            {!form.form.loading && form.state === DappState.PENDING &&  <div className="flex flex-row flex-wrap gap-5 h-[300px]">
                
            </div>}
            {!form.form.loading && form.state === DappState.PENDING_METAMASK &&  <div className="opacity-50 flex flex-col justify-center items-center gap-5 h-[300px]">
                <div className='p-5'>
                    <Image className='animate-spin' src='/icons/jacko.svg' alt='' height={200} width={200} />
                </div>
                <p className="text-xl font-body text-white">Confirm the transaction using your wallet provider</p>
            </div>}
            {form.form.loading && <div className="flex flex-row flex-wrap gap-5 justify-center items-center p-12">
                <Image className='animate-spin opacity-50' src='/icons/jacko.svg' alt='' height={250} width={250} />
            </div>}
        </div>
    )
}