import { Injectable } from "@nestjs/common";
import { ApiClient } from "./api-client.interface";
import { ISymbol } from "src/interfaces/symbol.interface";


@Injectable()
export class BinanceClient extends ApiClient {
    private static readonly API_ADDRESS = 'https://api.binance.com/api/v3';

    constructor() {
        super(BinanceClient.API_ADDRESS);
    }

    async getLastPrice(symbol: ISymbol): Promise<number> {
        const response = await fetch(`${this._apiAddress}/trades?symbol=${symbol.base}${symbol.quote}&limit=1`);
        if (!response.ok) {
            throw new Error('Http error during price fetch');
        }
        const result = await response.json();
        const price = parseFloat(result[0].price);
        return price;
    }
}