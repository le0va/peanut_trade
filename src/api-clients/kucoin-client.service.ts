import { Injectable } from "@nestjs/common";
import { ApiClient } from "./api-client.interface";
import { ISymbol } from "src/interfaces/symbol.interface";


@Injectable()
export class KucoinClient extends ApiClient {
    private static readonly API_ADDRESS = 'https://api.kucoin.com/api/v1';

    constructor() {
        super(KucoinClient.API_ADDRESS);
    }

    async getLastPrice(symbol: ISymbol): Promise<number> {
        const response = await fetch(`${this._apiAddress}/market/histories?symbol=${symbol.base}-${symbol.quote}&limit=1`);
        if (!response.ok) {
            throw new Error('Http error during price fetch');
        }
        const result = await response.json();
        const price = parseFloat(result.data[50].price);
        return price;
    }
}