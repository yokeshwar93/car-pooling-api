import { GROUP_STATUSES } from "src/common/constants";
export declare const JOURNEY_MOCK_DATA: {
    id: number;
    people: number;
};
export declare const LOCATE_ASSIGNED_DATA: {
    status: string;
    car: {
        id: number;
        seats: number;
    };
};
export declare const LOCATE_NOT_ASSIGNED_DATA: {
    status: string;
    car: any;
};
export declare const LOCATE_NOT_FOUND_DATA: {
    status: string;
    car: any;
};
export declare const ASSIGNED_DATA: {
    people: number;
    carId: number;
    currentStatus: GROUP_STATUSES;
};
export declare const COMPLETED_DATA: {
    people: number;
    carId: number;
    currentStatus: GROUP_STATUSES;
};
export declare const WAITING_LIST_DATA: {
    people: number;
    currentStatus: GROUP_STATUSES;
};
export declare const DROPPED_LIST_DATA: {
    people: number;
    currentStatus: GROUP_STATUSES;
};
export declare const LOCATE_REQUEST: {
    ID: number;
};
