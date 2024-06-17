import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { CommonRequestMiddleware } from "src/middleware/common.request.middleware";
import { CarsModule } from "../cars/cars.module";
import { JourneyModule } from "../journey/journey.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [CarsModule, JourneyModule],
  controllers: [AppController],
  providers: [AppService, CommonRequestMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CommonRequestMiddleware).forRoutes("cars");
    consumer.apply(CommonRequestMiddleware).forRoutes("journey");
    consumer.apply(CommonRequestMiddleware).forRoutes("locate");
    consumer.apply(CommonRequestMiddleware).forRoutes("dropoff");
  }
}
