"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarsModule = void 0;
const common_1 = require("@nestjs/common");
const journey_module_1 = require("../journey/journey.module");
const cars_controller_1 = require("./cars.controller");
const cars_db_1 = require("./cars.db");
const cars_service_1 = require("./cars.service");
let CarsModule = class CarsModule {
};
CarsModule = __decorate([
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => journey_module_1.JourneyModule)],
        exports: [cars_db_1.CarsDb],
        controllers: [cars_controller_1.CarsController],
        providers: [cars_service_1.CarsService, cars_db_1.CarsDb],
    })
], CarsModule);
exports.CarsModule = CarsModule;
//# sourceMappingURL=cars.module.js.map