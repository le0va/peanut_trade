import { IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class EstimateDto {
    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    inputAmount: number;

    @IsString()
    inputCurrency: string;

    @IsString()
    outputCurrency: string;
}