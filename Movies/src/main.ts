import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { ReportsService } from './reports/reports.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization'
  });

  const config = new DocumentBuilder()
  .setTitle('Mini kinopoisk') 
  .addBearerAuth() 
  .build();
const document = SwaggerModule.createDocument(app, config); 
SwaggerModule.setup('/docs', app, document); 

await app.listen(3000);
}
bootstrap();
