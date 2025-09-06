import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS configuration for frontend
  app.enableCors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log('Backend server running on http://localhost:3000');
}
bootstrap().catch((error) => console.error('Error starting server:', error));
