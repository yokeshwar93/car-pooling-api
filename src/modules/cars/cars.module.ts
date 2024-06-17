import { forwardRef, Module } from "@nestjs/common";
import { JourneyModule } from "../journey/journey.module";
import { CarsController } from "./cars.controller";
import { CarsDb } from "./cars.db";
import { CarsService } from "./cars.service";

@Module({
  imports: [forwardRef(() => JourneyModule)],
  exports: [CarsDb],
  controllers: [CarsController],
  providers: [CarsService, CarsDb],
})
export class CarsModule {}
