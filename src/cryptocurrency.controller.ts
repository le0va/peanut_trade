import { Controller, Get, Query } from '@nestjs/common';
import { CryptocurrencyService } from './cryptocurrency.service';
import { EstimateDto } from './dto/estimate.dto';
import { GetRatesDto } from './dto/get-rates.dto';


@Controller()
export class CryptocurrencyController {
    constructor(private readonly cryptocurrencyService: CryptocurrencyService) { }

    @Get('estimate')
    async estimate(@Query() query: EstimateDto) {
        const { inputAmount, inputCurrency, outputCurrency } = query;
        const result = await this.cryptocurrencyService.getBestPrice(inputCurrency, outputCurrency);
        const outputAmount = inputAmount / result.rate;

        return { exchangeName: result.exchangeName, outputAmount };
    }

    @Get('getRates')
    async getRates(@Query() query: GetRatesDto) {
        const { baseCurrency, quoteCurrency } = query;
        return this.cryptocurrencyService.getRates(baseCurrency, quoteCurrency);
    }
}
