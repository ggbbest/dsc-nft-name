import DSCNFTNameContract from "./src/DSCNFTNameContract";
import MateInfoContract from "./src/MateInfoContract";

(async () => {
    const names = await MateInfoContract.names();
    for (const [id, name] of Object.entries(names)) {
        if (name !== "") {
            await DSCNFTNameContract.importFromV1("0xe47e90c58f8336a2f24bcd9bcb530e2e02e1e8ae", id, name);
            console.log(`#${id} 이전 완료`);
        }
    }
})();
