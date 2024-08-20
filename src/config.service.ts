import { Injectable } from '@nestjs/common';


@Injectable()
export class ConfigService {

    // The lower the weight of the cryptocurrency, the more likely it is to be the quote currency
    private readonly currencyWeights = {
        USDT: 1,
        BTC: 2,
        ETH: 3
    };

    getCurrencyWeights() {
        return this.currencyWeights;
    }
}
