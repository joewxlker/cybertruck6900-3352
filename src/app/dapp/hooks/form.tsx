import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { ethers, type BigNumber } from "ethers";
import { useState, useEffect, useCallback } from "react";
import { trickOrTreatAbi, trickOrTreatAddressV2, erc20Abi, erc20Address } from "../constants";

export interface FormState {
    amount: number | null;
    allowance: number | null;
    contractAddress: string;
    contractBalance: number | null;
    spenderAddress: string | null;
    spenderBalance: number | null;
    loading: boolean;
}

const initialFormState: FormState = {
    amount: null,
    allowance: null,
    contractAddress: trickOrTreatAddressV2,
    contractBalance: null,
    spenderAddress: null,
    spenderBalance: null,
    loading: false,
}

export enum DappState {
    REQUIRE_APPROVAL,
    PENDING,
    PENDING_METAMASK,
    ERROR,
    INVALID_PARAMS,
    DEFAULT,
    INVALID_BALANCES,
    VALID,
}

export const useDappForm = () => {
    const [form, setForm] = useState<FormState>(initialFormState);
    const [state, setState] = useState<DappState>(DappState.DEFAULT);

    const address = useAddress();
    const { contract } = useContract(erc20Address, erc20Abi);
    const { data: erc20Balance } = useContractRead(contract,"balanceOf",[address]) as { data: BigNumber };
    const { data: trickOrTreatBalance } = useContractRead(contract,"balanceOf",[trickOrTreatAddressV2]) as { data: BigNumber };
    const { data: allowance } = useContractRead(contract,"allowance",[address, trickOrTreatAddressV2]) as { data: BigNumber };

    
    const updateForm = useCallback((value: Partial<FormState>) => {
        setForm(prev => ({...prev, ...value }));
    }, [setForm]);

    const updateState = useCallback((state: DappState) => {
        setState(state)
    }, [setState]);

    const _updateBalances = useCallback((balanceOne: BigNumber, balanceTwo: BigNumber) => {
        console.log("update balances", balanceOne, balanceTwo);
        balanceOne && updateForm({ contractBalance: Math.round(Number(ethers.utils.formatUnits(balanceOne.toString(), 'gwei'))) });
        balanceTwo && updateForm({ spenderBalance: Math.round(Number(ethers.utils.formatUnits(balanceTwo.toString(), 'gwei'))) });
    }, [updateForm]);

    const updateBalances = useCallback(() => {
        _updateBalances(trickOrTreatBalance, erc20Balance);
    }, [trickOrTreatBalance, erc20Balance, _updateBalances]);
    
    useEffect(() => {
        address && updateForm({ spenderAddress: address });
    }, [address, updateForm]);

    useEffect(() => {
        allowance && updateForm({ allowance: Number(ethers.utils.formatUnits(allowance.toString(), 'gwei')) });
    }, [allowance, updateForm]);

    useEffect(() => {
        if((typeof form.allowance === 'number' && typeof form.amount === 'number') && (form.allowance < form.amount)){
            updateState(DappState.REQUIRE_APPROVAL);
        }
    }, [form.allowance, form.amount, updateState]);

    useEffect(() => {
        _updateBalances(trickOrTreatBalance, erc20Balance);
    }, [trickOrTreatBalance, erc20Balance, _updateBalances]);

    useEffect(() => {
        if(state !== DappState.PENDING && state !== DappState.PENDING_METAMASK && state !== DappState.REQUIRE_APPROVAL){
            if(!form.amount || !form.contractBalance || !form.contractAddress || !form.spenderAddress || !form.spenderBalance){
                updateState(DappState.INVALID_PARAMS);
            } else if(form.amount > form.contractBalance || form.amount > form.spenderBalance) {
                updateState(DappState.INVALID_BALANCES);
            } else if(form.amount < form.contractBalance && form.amount < form.contractBalance){
                updateState(DappState.VALID);
            }
        }
    }, [form, updateState]);

    useEffect(() => {
        if(form.contractBalance){
            updateForm({ loading: false});
        }
    }, [form.contractBalance, updateForm]);

    return { form, state, updateForm, updateState, updateBalances };
}