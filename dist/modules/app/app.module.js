"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const common_request_middleware_1 = require("../../middleware/common.request.middleware");
const cars_module_1 = require("../cars/cars.module");
const journey_module_1 = require("../journey/journey.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(common_request_middleware_1.CommonRequestMiddleware).forRoutes("cars");
        consumer.apply(common_request_middleware_1.CommonRequestMiddleware).forRoutes("journey");
        consumer.apply(common_request_middleware_1.CommonRequestMiddleware).forRoutes("locate");
        consumer.apply(common_request_middleware_1.CommonRequestMiddleware).forRoutes("dropoff");
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [cars_module_1.CarsModule, journey_module_1.JourneyModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, common_request_middleware_1.CommonRequestMiddleware],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map