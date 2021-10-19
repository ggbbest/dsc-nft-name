import Contract from "./Contract";

class MateInfoContract extends Contract {

    constructor() {
        super("0x986130a92d8e805bb371e98dfa5d79f9db1eeaa2", require("./MateInfoContractABI.json"));
    }

    public async names(): Promise<{ [id: number]: string }> {
        const step = 600;

        let names: { [id: number]: string } = {};

        const promises: Promise<void>[] = [];
        for (let id = 0; id < 10000; id += step) {
            const promise = async (start: number, end: number) => {
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

    public async links(): Promise<{
        [id: number]: {
            twitter?: string,
            instagram?: string,
        },
    }> {
        const step = 300;

        const links: {
            [id: number]: {
                twitter?: string,
                instagram?: string,
            },
        } = {};

        const promises: Promise<void>[] = [];
        for (let id = 0; id < 10000; id += step) {

            const loadTwitters = async (start: number, end: number) => {
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

            const loadInstagrams = async (start: number, end: number) => {
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

export default new MateInfoContract();
