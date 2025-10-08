import { HTTP_STATUS_CODES } from "./constants.js";
class BaseError extends Error {
    constructor (message, status = 500) {
        super(message);
        this.status = status;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class BadRequest extends BaseError {
    constructor (message, data) {
        super(message, HTTP_STATUS_CODES.BAD_REQUEST);
        this.data = data
    }
}

export class NotFound extends BaseError {
    constructor (message) {
        super(message, HTTP_STATUS_CODES.NOT_FOUND)
    }
}

export class UnAuthorized extends BaseError {
    constructor (message) {
        super(message, HTTP_STATUS_CODES.UN_AUTHORIZED)
    }
}

export class Forbidden extends BaseError {
    constructor (message) {
        super(message, HTTP_STATUS_CODES.FORBIDDEN)
    }
}

export class InternalServer extends BaseError {
    constructor (message) {
        super(message, HTTP_STATUS_CODES.INTERNAL_SERVER)
    }
}