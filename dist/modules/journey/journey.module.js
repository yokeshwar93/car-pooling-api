"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JourneyModule = void 0;
const common_1 = require("@nestjs/common");
const cars_module_1 = require("../cars/cars.module");
const journey_controller_1 = require("./journey.controller");
const journey_db_1 = require("./journey.db");
const journey_service_1 = require("./journey.service");
let JourneyModule = class JourneyModule {
};
JourneyModule = __decorate([
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => cars_module_1.CarsModule)],
        exports: [journey_db_1.JourneyDb],
        controllers: [journey_controller_1.JourneyController],
        providers: [journey_service_1.JourneyService, journey_db_1.JourneyDb],
    })
], JourneyModule);
exports.JourneyModule = JourneyModule;
//# sourceMappingURL=journey.module.js.map