export interface IResponse<T = null> {
  data: T;
  success?: boolean;
  error?: boolean;
  message: string;
  status: number;
}

export interface ErrorResponse extends IResponse {
  stack?: string;
}

export const customResponse = <T>({ data, message, status, success = true, error = false }: IResponse<T>) => {
  return {
    success,
    error,
    message,
    status,
    data,
  };
};
