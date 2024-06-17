"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOCATE_REQUEST = exports.DROPPED_LIST_DATA = exports.WAITING_LIST_DATA = exports.COMPLETED_DATA = exports.ASSIGNED_DATA = exports.LOCATE_NOT_FOUND_DATA = exports.LOCATE_NOT_ASSIGNED_DATA = exports.LOCATE_ASSIGNED_DATA = exports.JOURNEY_MOCK_DATA = void 0;
const constants_1 = require("../../../common/constants");
exports.JOURNEY_MOCK_DATA = {
    id: 10,
    people: 6,
};
exports.LOCATE_ASSIGNED_DATA = {
    status: "OK",
    car: {
        id: 101,
        seats: 6,
    },
};
exports.LOCATE_NOT_ASSIGNED_DATA = {
    status: constants_1.ERROR_MESSAGES.NO_CONTENT,
    car: undefined,
};
exports.LOCATE_NOT_FOUND_DATA = {
    status: constants_1.ERROR_MESSAGES.NOT_FOUND,
    car: undefined,
};
exports.ASSIGNED_DATA = {
    people: 6,
    carId: 101,
    currentStatus: constants_1.GROUP_STATUSES.TRAVELLING,
};
exports.COMPLETED_DATA = {
    people: 6,
    carId: 101,
    currentStatus: constants_1.GROUP_STATUSES.COMPLETED,
};
exports.WAITING_LIST_DATA = {
    people: 6,
    currentStatus: constants_1.GROUP_STATUSES.WAITING,
};
exports.DROPPED_LIST_DATA = {
    people: 6,
    currentStatus: constants_1.GROUP_STATUSES.DROPPED,
};
exports.LOCATE_REQUEST = {
    ID: 10,
};
//# sourceMappingURL=__mockdata__.js.map