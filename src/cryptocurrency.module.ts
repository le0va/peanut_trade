import { Module } from '@nestjs/common';
import { CryptocurrencyController } from './cryptocurrency.controller';
import { CryptocurrencyService } from './cryptocurrency.service';
import { KucoinClient } from './api-clients/kucoin-client.service';
import { BinanceClient } from './api-clients/binance-client.service';
import { ConfigService } from './config.service';


@Module({
    imports: [],
    controllers: [CryptocurrencyController],
    providers: [CryptocurrencyService, KucoinClient, BinanceClient, ConfigService],
    exports: [KucoinClient, BinanceClient]
})
export class CryptocurrencyModule { }
