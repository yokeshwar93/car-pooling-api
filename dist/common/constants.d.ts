export declare enum GROUP_STATUSES {
    WAITING = "WAITING",
    DROPPED = "DROPPED",
    COMPLETED = "COMPLETED",
    TRAVELLING = "TRAVELLING"
}
export declare enum JOURNEY_REQUEST {
    DROPOFF = "DROPOFF",
    ASSIGNED = "ASSIGNED"
}
export declare const ERROR_MESSAGES: {
    NO_CONTENT: string;
    NOT_FOUND: string;
    CONTENT_TYPE_NOT_ALLOWED: string;
    REQUEST_METHOD_NOT_ALLOWED: string;
};
export declare const SERVER_PORT = 9091;
export declare const SWAGGER_DESCRIPTIONS: {
    CARS_OK: string;
    CARS_ERROR: string;
    JOURNEY_OK: string;
    JOURNEY_BAD_REQUEST: string;
    LOCATE_OK: string;
    LOCATE_NO_CONTENT: string;
    LOCATE_NOT_FOUND: string;
    LOCATE_BAD_REQUEST: string;
    DROPOFF_OK: string;
    DROPOFF_NO_CONTENT: string;
    DROPOFF_NOT_FOUND: string;
    DROPOFF_BAD_REQUEST: string;
};
