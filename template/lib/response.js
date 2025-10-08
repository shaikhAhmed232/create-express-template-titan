export class SuccessResponse {
    constructor(message, data) {
        this.success =  true;
        this.message = message;
        this.data = data;
    }
}

export class FailApiResponse {
    constructor(message, error) {
        this.success = false;
        this.message = message;
        this.error = error;
    }
}