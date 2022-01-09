"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const convertToHash = (text) => {
    return hardhat_1.ethers.utils.keccak256(hardhat_1.ethers.utils.toUtf8Bytes(text));
};
const ERC20_PERMIT_TYPEHASH = convertToHash("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
const ERC721_PERMIT_TYPEHASH = convertToHash("Permit(address spender,uint256 tokenId,uint256 nonce,uint256 deadline)");
const ERC721_PERMIT_ALL_TYPEHASH = convertToHash("Permit(address owner,address spender,uint256 nonce,uint256 deadline)");
const ERC1155_PERMIT_TYPEHASH = convertToHash("Permit(address owner,address spender,uint256 nonce,uint256 deadline)");
const domainSeparator = (name, tokenAddress) => {
    return hardhat_1.ethers.utils.keccak256(hardhat_1.ethers.utils.defaultAbiCoder.encode(["bytes32", "bytes32", "bytes32", "uint256", "address"], [
        hardhat_1.ethers.utils.keccak256(hardhat_1.ethers.utils.toUtf8Bytes("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)")),
        hardhat_1.ethers.utils.keccak256(hardhat_1.ethers.utils.toUtf8Bytes(name)),
        hardhat_1.ethers.utils.keccak256(hardhat_1.ethers.utils.toUtf8Bytes("1")),
        31337,
        tokenAddress,
    ]));
};
const approvalDigest = async (token, types, values) => {
    return hardhat_1.ethers.utils.keccak256(hardhat_1.ethers.utils.solidityPack(["bytes1", "bytes1", "bytes32", "bytes32"], [
        "0x19",
        "0x01",
        domainSeparator(await token.name(), token.address),
        hardhat_1.ethers.utils.keccak256(hardhat_1.ethers.utils.defaultAbiCoder.encode(types, values)),
    ]));
};
async function getERC20ApprovalDigest(token, approve, nonce, deadline) {
    return await approvalDigest(token, ["bytes32", "address", "address", "uint256", "uint256", "uint256"], [ERC20_PERMIT_TYPEHASH, approve.owner, approve.spender, approve.value, nonce, deadline]);
}
exports.getERC20ApprovalDigest = getERC20ApprovalDigest;
async function getERC721ApprovalDigest(token, approve, nonce, deadline) {
    return await approvalDigest(token, ["bytes32", "address", "uint256", "uint256", "uint256"], [ERC721_PERMIT_TYPEHASH, approve.spender, approve.id, nonce, deadline]);
}
exports.getERC721ApprovalDigest = getERC721ApprovalDigest;
async function getERC721ApprovalAllDigest(token, approve, nonce, deadline) {
    return await approvalDigest(token, ["bytes32", "address", "address", "uint256", "uint256"], [ERC721_PERMIT_ALL_TYPEHASH, approve.owner, approve.spender, nonce, deadline]);
}
exports.getERC721ApprovalAllDigest = getERC721ApprovalAllDigest;
async function getERC1155ApprovalDigest(token, approve, nonce, deadline) {
    return await approvalDigest(token, ["bytes32", "address", "address", "uint256", "uint256"], [ERC1155_PERMIT_TYPEHASH, approve.owner, approve.spender, nonce, deadline]);
}
exports.getERC1155ApprovalDigest = getERC1155ApprovalDigest;
//# sourceMappingURL=standard.js.map