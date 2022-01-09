"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Contract_1 = __importDefault(require("./Contract"));
class MateInfoContract extends Contract_1.default {
    constructor() {
        super("0x986130a92d8e805bb371e98dfa5d79f9db1eeaa2", require("./MateInfoContractABI.json"));
    }
    async names() {
        const step = 600;
        let names = {};
        const promises = [];
        for (let id = 0; id < 10000; id += step) {
            const promise = async (start, end) => {
                const result = await this.contract.methods.names(start, end).call();
                for (const [index, name] of result.entries()) {
                    names[start + index] = name;
                }
            };
            promises.push(promise(id, id + step > 9999 ? 9999 : id + step));
        }
        await Promise.all(promises);
        return names;
    }
    async links() {
        const step = 300;
        const links = {};
        const promises = [];
        for (let id = 0; id < 10000; id += step) {
            const loadTwitters = async (start, end) => {
                const twitters = await this.contract.methods.links(start, end, 0).call();
                for (const [index, twitter] of twitters.entries()) {
                    if (twitter !== "") {
                        if (links[start + index] === undefined) {
                            links[start + index] = {};
                        }
                        links[start + index].twitter = twitter;
                    }
                }
            };
            promises.push(loadTwitters(id, id + step > 9999 ? 9999 : id + step));
            const loadInstagrams = async (start, end) => {
                const instagrams = await this.contract.methods.links(start, end, 1).call();
                for (const [index, instagram] of instagrams.entries()) {
                    if (instagram !== "") {
                        if (links[start + index] === undefined) {
                            links[start + index] = {};
                        }
                        links[start + index].instagram = instagram;
                    }
                }
            };
            promises.push(loadInstagrams(id, id + step > 9999 ? 9999 : id + step));
        }
        await Promise.all(promises);
        return links;
    }
}
exports.default = new MateInfoContract();
//# sourceMappingURL=MateInfoContract.js.map