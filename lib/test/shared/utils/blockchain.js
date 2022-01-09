"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
async function mine(count = 1) {
    chai_1.expect(count).to.be.gt(0);
    for (let i = 0; i < count; i += 1) {
        await hardhat_1.ethers.provider.send("evm_mine", []);
    }
}
exports.mine = mine;
//# sourceMappingURL=blockchain.js.map