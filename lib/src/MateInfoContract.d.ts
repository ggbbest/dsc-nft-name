import Contract from "./Contract";
declare class MateInfoContract extends Contract {
    constructor();
    names(): Promise<{
        [id: number]: string;
    }>;
    links(): Promise<{
        [id: number]: {
            twitter?: string;
            instagram?: string;
        };
    }>;
}
declare const _default: MateInfoContract;
export default _default;
//# sourceMappingURL=MateInfoContract.d.ts.map