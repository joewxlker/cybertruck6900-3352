export interface ProjectInfo {
  about: string;
  symbol: string;
  telegram: string;
  twitter: string;
  taxes: {
    taxFeeOnBuy: string;
    taxFeeOnSell: string;
  };
  contractAddress: string;
  uniswap: string;
  etherscan: string;
  dextools: string;
  meta: {
    title: string;
    description: string;
    icons: {
      rel: string;
      url: string;
    }[];
  };
}
