import { expect } from "chai";
import { ethers, network, waffle } from "hardhat";
import DogeSoundClubMateArtifact from "../artifacts/contracts/DogeSoundClubMate.sol/DogeSoundClubMate.json";
import DSCNFTNameArtifact from "../artifacts/contracts/DSCNFTName.sol/DSCNFTName.json";
import KIP7TokenArtifact from "../artifacts/contracts/klaytn-contracts/token/KIP7/KIP7Token.sol/KIP7Token.json";
import { DogeSoundClubMate } from "../typechain/DogeSoundClubMate";
import { DSCNFTName } from "../typechain/DSCNFTName";
import { KIP7Token } from "../typechain/KIP7Token";
import { expandTo18Decimals } from "./shared/utils/number";

const { deployContract } = waffle;

async function mine(count = 1): Promise<void> {
    expect(count).to.be.gt(0);
    for (let i = 0; i < count; i += 1) {
        await ethers.provider.send("evm_mine", []);
    }
}

describe("DSCNFTName", () => {
    let mate: DogeSoundClubMate;
    let mix: KIP7Token;
    let mateName: DSCNFTName;

    const provider = waffle.provider;
    const [admin, other] = provider.getWallets();

    beforeEach(async () => {
        mate = await deployContract(
            admin,
            DogeSoundClubMateArtifact,
            []
        ) as DogeSoundClubMate;
        mix = await deployContract(
            admin,
            KIP7TokenArtifact,
            ["TestToken", "TEST", 18, expandTo18Decimals(999999)]
        ) as KIP7Token;
        mateName = await deployContract(
            admin,
            DSCNFTNameArtifact,
            [mix.address]
        ) as DSCNFTName;
        await mix.approve(mateName.address, expandTo18Decimals(999999));
    })

    context("new DSCNFTName", async () => {
        it("set name", async () => {
            await mate.mint(admin.address, 0);
            await expect(mateName.set(mate.address, 0, "도지사운드클럽"))
                .to.emit(mateName, "Set")
                .withArgs(mate.address, 0, admin.address, "도지사운드클럽")
            expect(await mateName.names(mate.address, 0)).to.be.equal("도지사운드클럽");
        })

        it("remove name", async () => {
            await mate.mint(admin.address, 0);
            await expect(mateName.set(mate.address, 0, "도지사운드클럽"))
                .to.emit(mateName, "Set")
                .withArgs(mate.address, 0, admin.address, "도지사운드클럽")
            expect(await mateName.names(mate.address, 0)).to.be.equal("도지사운드클럽");

            console.log(await mateName.exists("도지사운드클럽"));

            console.log((await mix.balanceOf(admin.address)).toString());
            await expect(mateName.remove(mate.address, 0))
                .to.emit(mateName, "Remove")
                .withArgs(mate.address, 0, admin.address)
            expect(await mateName.names(mate.address, 0)).to.be.equal("");
            console.log((await mix.balanceOf(admin.address)).toString());

            console.log(await mateName.exists("도지사운드클럽"));
        })

        it("set name twice", async () => {
            await mate.mint(admin.address, 0);
            await expect(mateName.set(mate.address, 0, "도지사운드클럽"))
                .to.emit(mateName, "Set")
                .withArgs(mate.address, 0, admin.address, "도지사운드클럽")
            expect(await mateName.names(mate.address, 0)).to.be.equal("도지사운드클럽");
            await expect(mateName.set(mate.address, 0, "왈왈"))
                .to.emit(mateName, "Set")
                .withArgs(mate.address, 0, admin.address, "왈왈")
            expect(await mateName.names(mate.address, 0)).to.be.equal("왈왈");
        })

        it("set name duplicated", async () => {
            await mate.mint(admin.address, 0);
            await mate.mint(admin.address, 1);

            console.log(await mateName.exists("도지사운드클럽"));
            await expect(mateName.set(mate.address, 0, "도지사운드클럽"))
                .to.emit(mateName, "Set")
                .withArgs(mate.address, 0, admin.address, "도지사운드클럽")

            console.log(await mateName.exists("도지사운드클럽"));
            expect(await mateName.names(mate.address, 0)).to.be.equal("도지사운드클럽");
            await expect(mateName.set(mate.address, 1, "도지사운드클럽")).to.reverted;
            await expect(mateName.set(mate.address, 0, "도지사운드클럽2"))
                .to.emit(mateName, "Set")
                .withArgs(mate.address, 0, admin.address, "도지사운드클럽2")

            console.log(await mateName.exists("도지사운드클럽"));

            await expect(mateName.set(mate.address, 1, "도지사운드클럽"))
                .to.emit(mateName, "Set")
                .withArgs(mate.address, 1, admin.address, "도지사운드클럽")
            expect(await mateName.names(mate.address, 1)).to.be.equal("도지사운드클럽");
        })

        it("set name twice with mix", async () => {

            await mate.mint(admin.address, 0);
            await expect(mateName.set(mate.address, 0, "도지사운드클럽"))
                .to.emit(mateName, "Set")
                .withArgs(mate.address, 0, admin.address, "도지사운드클럽")
            expect(await mateName.names(mate.address, 0)).to.be.equal("도지사운드클럽");

            console.log((await mix.balanceOf(admin.address)).toString());

            await expect(mateName.set(mate.address, 0, "왈왈"))
                .to.emit(mateName, "Set")
                .withArgs(mate.address, 0, admin.address, "왈왈")
            expect(await mateName.names(mate.address, 0)).to.be.equal("왈왈");

            await expect(mateName.set(mate.address, 0, "깽깽"))
                .to.emit(mateName, "Set")
                .withArgs(mate.address, 0, admin.address, "깽깽")
            expect(await mateName.names(mate.address, 0)).to.be.equal("깽깽");

            console.log((await mix.balanceOf(admin.address)).toString());
        })
    })
})