export class CustomError extends Error {
    // we have 3 things
    message: string;
    statusCode: number;
    redirectTo ?: string;

    constructor(message: string, statusCode: number, redirectTo ?: string) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.redirectTo = redirectTo;
    }
}