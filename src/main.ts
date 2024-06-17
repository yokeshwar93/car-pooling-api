import { NestFactory } from "@nestjs/core";
import { SERVER_PORT } from "./common/constants";
import { AppModule } from "./modules/app/app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { json } from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Increase the payload size to accomadate large requests
  app.use(json({ limit: "50mb" }));
  const config = new DocumentBuilder()
    .setTitle("Cabify Car Pooling")
    .setDescription("Cabify Car Pooling API")
    .setVersion("1.0")
    .addTag("cabify")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  await app.listen(SERVER_PORT);
}
bootstrap();
