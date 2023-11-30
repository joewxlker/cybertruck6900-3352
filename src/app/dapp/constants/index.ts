import { ChainId } from '@thirdweb-dev/sdk'

export const CHAIN_ID: ChainId.Mainnet | ChainId.Goerli = ChainId.Goerli

export * from './abi'
export * from './address'

export const etherscanUrl: {[k in ChainId.Mainnet | ChainId.Goerli] : string } = {
    [ChainId.Mainnet]: 'https://etherscan.io/',
    [ChainId.Goerli]: 'https://goerli.etherscan.io/'
}