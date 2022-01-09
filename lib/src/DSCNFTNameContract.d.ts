import { BigNumberish } from "ethers";
import Contract from "./Contract";
declare class DSCNFTNameContract extends Contract {
    constructor();
    importFromV1(nft: string, mateId: BigNumberish, name: string): Promise<void>;
}
declare const _default: DSCNFTNameContract;
export default _default;
//# sourceMappingURL=DSCNFTNameContract.d.ts.map