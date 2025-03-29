export interface ResponseType<T> {
    statusCode: number;
    message?: string;
    data?: T;
    count?: number;
}