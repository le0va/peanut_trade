import { Injectable } from '@nestjs/common';
import { KucoinClient } from './api-clients/kucoin-client.service';
import { BinanceClient } from './api-clients/binance-client.service';
import { ConfigService } from './config.service';
import { ISymbol } from './interfaces/symbol.interface';
import { IRate } from './interfaces/rate.interface';


@Injectable()
export class CryptocurrencyService {
    constructor(
        private readonly kucoinClient: KucoinClient,
        private readonly binanceClient: BinanceClient,
        private readonly configService: ConfigService
    ) { }

    
    private getSymbolBaseAndQuote(currency1: string, currency2: string): ISymbol {
        const currencyWeights = this.configService.getCurrencyWeights();
        const weight1 = currencyWeights[currency1];
        const weight2 = currencyWeights[currency2];

        if (weight1 < weight2) {
            return { base: currency2, quote: currency1 };
        }
        else if (weight1 > weight2) {
            return { base: currency1, quote: currency2 };
        }
        else {
            throw new Error(`Weights error: currencies ${currency1} and ${currency2} have the same weights`);
        }
    }


    async getRates(baseCurrency: string, quoteCurrency: string): Promise<IRate[]> {
        const symbol = this.getSymbolBaseAndQuote(baseCurrency, quoteCurrency);

        try {
            const fetchPrices = [
                this.binanceClient.getLastPrice(symbol).then(price => ({ exchangeName: 'binance', rate: price })),
                this.kucoinClient.getLastPrice(symbol).then(price => ({ exchangeName: 'kucoin', rate: price }))
            ];

            const prices = await Promise.all(fetchPrices);
            const adjustedPrices = baseCurrency === symbol.base
                ? prices
                : prices.map(({ exchangeName, rate }) => ({ exchangeName, rate: 1 / rate }));

            return adjustedPrices;
        }
        catch (err) {
            console.error('Error fetching rates: ' + err);
            throw err;
        }

    }


    async getBestPrice(inputCurrency: string, outputCurrency: string) {
        try {
            const rates = await this.getRates(outputCurrency, inputCurrency);
            const bestRate = rates.reduce((min, current) => current.rate < min.rate ? current : min);

            return bestRate;
        }
        catch (err) {
            console.error('Error during estimate: ' + err)
            throw err;
        }
    }
}
