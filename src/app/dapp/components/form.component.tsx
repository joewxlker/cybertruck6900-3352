import { Web3Button } from "@thirdweb-dev/react";
import { type SmartContract } from "@thirdweb-dev/sdk";
import { type BaseContract } from "ethers";
import { type ChangeEvent, type FC, useCallback } from "react";
import { erc20Address, trickOrTreatAddressV2, erc20Abi, trickOrTreatAbi } from "../constants";
import { type FormState, DappState } from "../hooks/form";
import Image from "next/image";

interface DappFormProps {
    form: {form: FormState, state: DappState}; 
    onUpdateAmount: (amount: ChangeEvent<HTMLInputElement>) => void;
    onSetAmountAsPercentage: (amount: number) => void;
    onSubmit: (contract: SmartContract<BaseContract>) => void;
    onApprove: (contract: SmartContract<BaseContract>) => void;
    onError: (error: unknown) => void;
}
export const DappFormComponent: FC<DappFormProps> = ({ form, onUpdateAmount, onSetAmountAsPercentage, onSubmit, onApprove, onError }) => {
    const updateAmount = useCallback((amount: ChangeEvent<HTMLInputElement>) => onUpdateAmount(amount), [onUpdateAmount]);
    const setAmountAsPercentage = useCallback((amount: number) => onSetAmountAsPercentage(amount), [onSetAmountAsPercentage]);
    const submit = useCallback((contract: SmartContract<BaseContract>) => onSubmit(contract), [onSubmit]);
    const approve = useCallback((contract: SmartContract<BaseContract>) => onApprove(contract), [onApprove]);
    const error = useCallback((error: unknown) => onError(error), [onError]);
    return (
        <form className="flex-1 flex flex-col gap-5 justify-evenly">
            <div className='flex flex-row justify-between items-center w-full'>
                <label>
                    <p className='text-xl text-white font-body'>Spooky Balance : {form.form.spenderBalance ?? 0}</p>
                </label>
                <div className="group relative rounded-full flex justify-center items-center cursor-pointer">
                    <Image src='/icons/jacko.svg' alt='' height={20} width={20} />
                    <div className='absolute hidden group-hover:flex left-[50%] -top-[60px] p-1 -translate-x-[50%] bg-black bg-opacity-90 rounded w-60'>
                        <p className="text-white font-body">
                            Enter an amount and hit confirm to see if you get a trick or a treat.
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full relative">
                <div className="absolute right-0 top-0 bottom-0 pr-3 py-3 flex justify-center items-center">
                    <button type='button' disabled className="bg-b1 flex flex-row h-full px-2 items-center rounded gap-2">
                        <p className='text-white font-heading text-2xl'>SPOOKY</p>
                        <Image src="" alt="" height={25} width={25} />
                    </button>
                </div>
                <input min='0' value={form.form.amount ?? 0} onChange={updateAmount} className="p-4 py-5 rounded w-full bg-black text-white text-xl font-body" placeholder="0" />
            </div>
            <div className="gap-2 flex flex-row justify-end h-full">
                <button 
                    onClick={() => setAmountAsPercentage(0.1)}
                    disabled={!form.form.spenderBalance}
                    type='button'
                    className={`${!form.form.spenderBalance ? 'opacity-50' : 'hover:bg-t2' } h-full flex-1 rounded bg-[#fbbf24]`}>
                        <p className='text-b3 font-heading text-2xl'>10%</p>
                </button>
                <button 
                    onClick={() => setAmountAsPercentage(0.5)}
                    disabled={!form.form.spenderBalance}
                    type='button'
                    className={`${!form.form.spenderBalance ? 'opacity-50' : 'hover:bg-b2' } h-full flex-1 rounded bg-t2`}>
                        <p className='text-b3 font-heading text-2xl'>50%</p>
                </button>
                <button
                    onClick={() => setAmountAsPercentage(1)}
                    disabled={!form.form.spenderBalance}
                    type='button'
                    className={`${!form.form.spenderBalance ? 'opacity-50' : 'hover:bg-t2' } h-full flex-1 rounded bg-b2`}>
                        <p className='text-b3 font-heading text-2xl'>100%</p>
                </button>
            </div>
            {form.state !== DappState.REQUIRE_APPROVAL && <Web3Button
                className="!bg-black !text-white !font-heading !text-2xl !shadow-md !shadow-black hover:scale-105 !transition-transform !duration-300"
                type='button'
                isDisabled={form.state !== DappState.VALID}
                theme='dark'
                contractAbi={trickOrTreatAbi}
                onError={error}
                contractAddress={trickOrTreatAddressV2}
                action={submit}>
                    {form.state === DappState.PENDING && <p className='md text-t2'>Pending</p>}
                    {form.state === DappState.INVALID_PARAMS && <p className='md text-t2'>Please enter an amount</p>}
                    {form.state === DappState.INVALID_BALANCES && <p className='md text-t2'>Invalid Balances</p>}
                    {form.state === DappState.DEFAULT && <p className='md text-t2'>Default</p>}
                    {form.state === DappState.VALID && <p className='md text-t2'>Trick or Treat</p>}
                    {form.state === DappState.ERROR && <p className='md text-t2'>Error Try Again</p>}
            </Web3Button>}
            {form.state === DappState.REQUIRE_APPROVAL && <Web3Button
                className="!bg-black !text-white !font-heading !text-2xl !shadow-md !shadow-black hover:scale-105 !transition-transform !duration-300"
                type='button'
                theme='dark'
                contractAbi={erc20Abi}
                contractAddress={erc20Address}
                action={approve}>
                    <p className='md text-t2'>Approve</p>
            </Web3Button>}
        </form>
    )
}