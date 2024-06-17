import { forwardRef, Module } from "@nestjs/common";
import { CarsModule } from "../cars/cars.module";
import { JourneyController } from "./journey.controller";
import { JourneyDb } from "./journey.db";
import { JourneyService } from "./journey.service";

@Module({
  imports: [forwardRef(() => CarsModule)],
  exports: [JourneyDb],
  controllers: [JourneyController],
  providers: [JourneyService, JourneyDb],
})
export class JourneyModule {}
