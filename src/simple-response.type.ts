export type SimpleResponse<T = any> = {
  success: boolean;
  data?: T;
  message?: string;
};
