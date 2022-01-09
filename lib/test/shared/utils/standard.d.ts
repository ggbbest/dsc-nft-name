import { BigNumber, Contract } from "ethers";
export declare function getERC20ApprovalDigest(token: Contract, approve: {
    owner: string;
    spender: string;
    value: BigNumber;
}, nonce: BigNumber, deadline: BigNumber): Promise<string>;
export declare function getERC721ApprovalDigest(token: Contract, approve: {
    spender: string;
    id: BigNumber;
}, nonce: BigNumber, deadline: BigNumber): Promise<string>;
export declare function getERC721ApprovalAllDigest(token: Contract, approve: {
    owner: string;
    spender: string;
}, nonce: BigNumber, deadline: BigNumber): Promise<string>;
export declare function getERC1155ApprovalDigest(token: Contract, approve: {
    owner: string;
    spender: string;
}, nonce: BigNumber, deadline: BigNumber): Promise<string>;
//# sourceMappingURL=standard.d.ts.map