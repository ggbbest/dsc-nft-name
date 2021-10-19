import { BigNumberish } from "ethers";
import Contract from "./Contract";
import Klaytn from "./Klaytn";

class DSCNFTNameContract extends Contract {

    constructor() {
        super("0xd095c72B42547c7097089E36908d60d13347823a", require("./DSCNFTNameContractABI.json"));
    }

    public async importFromV1(nft: string, mateId: BigNumberish, name: string): Promise<void> {
        const register = Klaytn.walletAddress;
        await this.contract.methods.importFromV1(nft, mateId, name).send({ from: register, gas: 1500000 });
    }
}

export default new DSCNFTNameContract();
