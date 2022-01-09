"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DSCNFTNameContract_1 = __importDefault(require("./src/DSCNFTNameContract"));
const MateInfoContract_1 = __importDefault(require("./src/MateInfoContract"));
(async () => {
    const names = await MateInfoContract_1.default.names();
    for (const [id, name] of Object.entries(names)) {
        if (name !== "") {
            await DSCNFTNameContract_1.default.importFromV1("0xe47e90c58f8336a2f24bcd9bcb530e2e02e1e8ae", id, name);
            console.log(`#${id} 이전 완료`);
        }
    }
})();
//# sourceMappingURL=import-from-v1.js.map