import { ISymbol } from "src/interfaces/symbol.interface";


export abstract class ApiClient {
    protected _apiAddress: string;

    constructor(apiAddress: string) {
        this._apiAddress = apiAddress;
    }

    abstract getLastPrice(symbol: ISymbol): Promise<number>;
}