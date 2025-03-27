export interface ResponseType<T> {
    status: number;
    message: string;
    data?: T;
}