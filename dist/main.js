"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const constants_1 = require("./common/constants");
const app_module_1 = require("./modules/app/app.module");
const swagger_1 = require("@nestjs/swagger");
const express_1 = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, express_1.json)({ limit: "50mb" }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Cabify Car Pooling")
        .setDescription("Cabify Car Pooling API")
        .setVersion("1.0")
        .addTag("cabify")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api", app, document);
    await app.listen(constants_1.SERVER_PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map