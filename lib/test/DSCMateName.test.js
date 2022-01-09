"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
const DogeSoundClubMate_json_1 = __importDefault(require("../artifacts/contracts/DogeSoundClubMate.sol/DogeSoundClubMate.json"));
const DSCNFTName_json_1 = __importDefault(require("../artifacts/contracts/DSCNFTName.sol/DSCNFTName.json"));
const KIP7Token_json_1 = __importDefault(require("../artifacts/contracts/klaytn-contracts/token/KIP7/KIP7Token.sol/KIP7Token.json"));
const number_1 = require("./shared/utils/number");
const { deployContract } = hardhat_1.waffle;
async function mine(count = 1) {
    chai_1.expect(count).to.be.gt(0);
    for (let i = 0; i < count; i += 1) {
        await hardhat_1.ethers.provider.send("evm_mine", []);
    }
}
describe("DSCNFTName", () => {
    let mate;
    let mix;
    let mateName;
    const provider = hardhat_1.waffle.provider;
    const [admin, other] = provider.getWallets();
    beforeEach(async () => {
        mate = await deployContract(admin, DogeSoundClubMate_json_1.default, []);
        mix = await deployContract(admin, KIP7Token_json_1.default, ["TestToken", "TEST", 18, number_1.expandTo18Decimals(999999)]);
        mateName = await deployContract(admin, DSCNFTName_json_1.default, [mix.address]);
        await mix.approve(mateName.address, number_1.expandTo18Decimals(999999));
    });
    context("new DSCNFTName", async () => {
        it("set name", async () => {
            await mate.mint(admin.address, 0);
            await chai_1.expect(mateName.set(mate.address, 0, "도지사운드클럽"))
                .to.emit(mateName, "Set")
                .withArgs(mate.address, 0, admin.address, "도지사운드클럽");
            chai_1.expect(await mateName.names(mate.address, 0)).to.be.equal("도지사운드클럽");
        });
        it("remove name", async () => {
            await mate.mint(admin.address, 0);
            await chai_1.expect(mateName.set(mate.address, 0, "도지사운드클럽"))
                .to.emit(mateName, "Set")
                .withArgs(mate.address, 0, admin.address, "도지사운드클럽");
            chai_1.expect(await mateName.names(mate.address, 0)).to.be.equal("도지사운드클럽");
            console.log(await mateName.exists("도지사운드클럽"));
            console.log((await mix.balanceOf(admin.address)).toString());
            await chai_1.expect(mateName.remove(mate.address, 0))
                .to.emit(mateName, "Remove")
                .withArgs(mate.address, 0, admin.address);
            chai_1.expect(await mateName.names(mate.address, 0)).to.be.equal("");
            console.log((await mix.balanceOf(admin.address)).toString());
            console.log(await mateName.exists("도지사운드클럽"));
        });
        it("set name twice", async () => {
            await mate.mint(admin.address, 0);
            await chai_1.expect(mateName.set(mate.address, 0, "도지사운드클럽"))
                .to.emit(mateName, "Set")
                .withArgs(mate.address, 0, admin.address, "도지사운드클럽");
            chai_1.expect(await mateName.names(mate.address, 0)).to.be.equal("도지사운드클럽");
            await chai_1.expect(mateName.set(mate.address, 0, "왈왈"))
                .to.emit(mateName, "Set")
                .withArgs(mate.address, 0, admin.address, "왈왈");
            chai_1.expect(await mateName.names(mate.address, 0)).to.be.equal("왈왈");
        });
        it("set name duplicated", async () => {
            await mate.mint(admin.address, 0);
            await mate.mint(admin.address, 1);
            console.log(await mateName.exists("도지사운드클럽"));
            await chai_1.expect(mateName.set(mate.address, 0, "도지사운드클럽"))
                .to.emit(mateName, "Set")
                .withArgs(mate.address, 0, admin.address, "도지사운드클럽");
            console.log(await mateName.exists("도지사운드클럽"));
            chai_1.expect(await mateName.names(mate.address, 0)).to.be.equal("도지사운드클럽");
            await chai_1.expect(mateName.set(mate.address, 1, "도지사운드클럽")).to.reverted;
            await chai_1.expect(mateName.set(mate.address, 0, "도지사운드클럽2"))
                .to.emit(mateName, "Set")
                .withArgs(mate.address, 0, admin.address, "도지사운드클럽2");
            console.log(await mateName.exists("도지사운드클럽"));
            await chai_1.expect(mateName.set(mate.address, 1, "도지사운드클럽"))
                .to.emit(mateName, "Set")
                .withArgs(mate.address, 1, admin.address, "도지사운드클럽");
            chai_1.expect(await mateName.names(mate.address, 1)).to.be.equal("도지사운드클럽");
        });
        it("set name twice with mix", async () => {
            await mate.mint(admin.address, 0);
            await chai_1.expect(mateName.set(mate.address, 0, "도지사운드클럽"))
                .to.emit(mateName, "Set")
                .withArgs(mate.address, 0, admin.address, "도지사운드클럽");
            chai_1.expect(await mateName.names(mate.address, 0)).to.be.equal("도지사운드클럽");
            console.log((await mix.balanceOf(admin.address)).toString());
            await chai_1.expect(mateName.set(mate.address, 0, "왈왈"))
                .to.emit(mateName, "Set")
                .withArgs(mate.address, 0, admin.address, "왈왈");
            chai_1.expect(await mateName.names(mate.address, 0)).to.be.equal("왈왈");
            await chai_1.expect(mateName.set(mate.address, 0, "깽깽"))
                .to.emit(mateName, "Set")
                .withArgs(mate.address, 0, admin.address, "깽깽");
            chai_1.expect(await mateName.names(mate.address, 0)).to.be.equal("깽깽");
            console.log((await mix.balanceOf(admin.address)).toString());
        });
    });
});
//# sourceMappingURL=DSCMateName.test.js.map