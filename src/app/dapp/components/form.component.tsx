import { Web3Button } from "@thirdweb-dev/react";
import { type SmartContract } from "@thirdweb-dev/sdk";
import { type BaseContract } from "ethers";
import { type ChangeEvent, type FC, useCallback } from "react";
import { trickOrTreatAbi, type SupportedChainIds, trickOrTreatAddresses, erc20Abi, erc20Addresses } from "../constants";
import { type FormState, DappState } from "../hooks/form";
import Image from "next/image";

interface DappFormProps {
    chainId: SupportedChainIds;
    form: {form: FormState, state: DappState}; 
    onUpdateAmount: (amount: ChangeEvent<HTMLInputElement>) => void;
    onSetAmountAsPercentage: (amount: number) => void;
    onSubmit: (contract: SmartContract<BaseContract>) => void;
    onApprove: (contract: SmartContract<BaseContract>) => void;
    onError: (error: unknown) => void;
}
export const DappFormComponent: FC<DappFormProps> = ({ chainId, form, onUpdateAmount, onSetAmountAsPercentage, onSubmit, onApprove, onError }) => {
    const updateAmount = useCallback((amount: ChangeEvent<HTMLInputElement>) => onUpdateAmount(amount), [onUpdateAmount]);
    const setAmountAsPercentage = useCallback((amount: number) => onSetAmountAsPercentage(amount), [onSetAmountAsPercentage]);
    const submit = useCallback((contract: SmartContract<BaseContract>) => onSubmit(contract), [onSubmit]);
    const approve = useCallback((contract: SmartContract<BaseContract>) => onApprove(contract), [onApprove]);
    const error = useCallback((error: unknown) => onError(error), [onError]);
    return (
        <form className="flex-1 flex flex-col gap-5 justify-evenly">
            <div className='flex flex-row justify-between items-center w-full'>
                <label>
                    <p className='text-xl text-white font-body'>$CYBER Balance : {form.form.spenderBalance ?? 0}</p>
                </label>
                <div className="group relative rounded-full justify-center items-center cursor-pointer xl:flex lg:flex hidden">
                    <Image className="opacity-50 hover:opacity-100 duration-300 transition-opacity" src='/icons/info.svg' alt='' height={20} width={20} />
                    <div className='absolute opacity-0 group-hover:opacity-100 left-[50%] -top-[85px] p-1 -translate-x-[50%] bg-black bg-opacity-90 w-80 transition-all duration-300'>
                        <p className="text-white font-body">
                            Enter an amount and hit confirm for a chance at doubling your input amount or winning a tesla cybertruck
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full relative">
                <div className="absolute right-0 top-0 bottom-0 pr-3 py-3 flex justify-center items-center">
                    <button type='button' disabled className="bg-b1 flex flex-row h-full px-2 items-center gap-2">
                        <p className='text-white font-heading text-2xl'>$CYBER</p>
                        <Image src="/logo-nobg100px.png" alt="" height={25} width={25} />
                    </button>
                </div>
                <input min='0' value={form.form.amount ?? 0} onChange={updateAmount} className="p-4 py-5 w-full focus:border-blue-400 border-t1 bg-black border-opacity-30 border-[1px] rounded text-white text-xl font-body" placeholder="0" />
            </div>
            <div className="gap-2 flex flex-row justify-end h-12">
                <button 
                    onClick={() => setAmountAsPercentage(0.1)}
                    disabled={!form.form.spenderBalance}
                    type='button'
                    className={`${!form.form.spenderBalance ? 'opacity-50' : 'hover:bg-opacity-50' } h-full flex-1 border-t1 border-[1px] bg-t1 bg-opacity-30 border-opacity-30 transition-all duration-300`}>
                        <p className='text-b3 font-heading text-xl text-t1'>10%</p>
                </button>
                <button 
                    onClick={() => setAmountAsPercentage(0.5)}
                    disabled={!form.form.spenderBalance}
                    type='button'
                    className={`${!form.form.spenderBalance ? 'opacity-50' : 'hover:bg-opacity-50' } h-full flex-1 border-t1 border-[1px] bg-t1 bg-opacity-30 border-opacity-30 transition-all duration-300`}>
                        <p className='text-b3 font-heading text-xl text-t1'>50%</p>
                </button>
                <button
                    onClick={() => setAmountAsPercentage(1)}
                    disabled={!form.form.spenderBalance}
                    type='button'
                    className={`${!form.form.spenderBalance ? 'opacity-50' : 'hover:bg-opacity-50' } h-full flex-1 border-t1 border-[1px] bg-t1 bg-opacity-30 border-opacity-30 transition-all duration-300`}>
                        <p className='text-b3 font-heading text-xl text-t1'>100%</p>
                </button>
            </div>
            {form.state !== DappState.REQUIRE_APPROVAL && <Web3Button
                className="!bg-white !bg-opacity-30 border-t1 border-[1px] !text-white !font-heading !text-2xl !shadow-md !shadow-black hover:!bg-opacity-50 !transition-all !duration-300"
                type='button'
                isDisabled={form.state !== DappState.VALID}
                theme='dark'
                contractAbi={trickOrTreatAbi}
                onError={error}
                contractAddress={trickOrTreatAddresses[chainId]}
                action={submit}>
                    {form.state === DappState.PENDING && <p className='md text-t2'>Pending</p>}
                    {form.state === DappState.INSUFFICIENT_CONTRACT_BALANCE && <p className='text-t2 text-md text-center'>Insufficient contract token balance</p>}
                    {form.state === DappState.INVALID_PARAMS && <p className='text-md text-center text-t2'>Please enter an amount</p>}
                    {form.state === DappState.INVALID_BALANCES && <p className='text-md text-center text-t2'>Invalid Balances</p>}
                    {form.state === DappState.DEFAULT && <p className='text-md text-center text-t2'>Default</p>}
                    {form.state === DappState.VALID && <p className='text-md text-center text-t2'>Trick or Treat</p>}
                    {form.state === DappState.ERROR && <p className='text-md text-center text-t2'>Error Try Again</p>}
            </Web3Button>}
            {form.state === DappState.REQUIRE_APPROVAL && <Web3Button
                className="!bg-white !bg-opacity-30 border-t1 border-[1px] !text-white !font-heading !text-2xl !shadow-md !shadow-black !hover:bg-opacity-50 !transition-all !duration-300"
                type='button'
                theme='dark'
                contractAbi={erc20Abi}
                contractAddress={erc20Addresses[chainId]}
                action={approve}>
                    <p className='text-md text-t2'>Approve</p>
            </Web3Button>}
            <p className="text-white font-body text-center xl:hidden lg:hidden block">
                Enter an amount and hit confirm for a chance at doubling your input amount or winning a tesla cybertruck
            </p>
        </form>
    )
}