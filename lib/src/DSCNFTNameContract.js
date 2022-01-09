"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Contract_1 = __importDefault(require("./Contract"));
const Klaytn_1 = __importDefault(require("./Klaytn"));
class DSCNFTNameContract extends Contract_1.default {
    constructor() {
        super("0xd095c72B42547c7097089E36908d60d13347823a", require("./DSCNFTNameContractABI.json"));
    }
    async importFromV1(nft, mateId, name) {
        const register = Klaytn_1.default.walletAddress;
        await this.contract.methods.importFromV1(nft, mateId, name).send({ from: register, gas: 1500000 });
    }
}
exports.default = new DSCNFTNameContract();
//# sourceMappingURL=DSCNFTNameContract.js.map