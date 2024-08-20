import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { CryptocurrencyModule } from './cryptocurrency.module';


async function bootstrap() {
    const app = await NestFactory.create(CryptocurrencyModule);
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.listen(3000);
}
bootstrap();
