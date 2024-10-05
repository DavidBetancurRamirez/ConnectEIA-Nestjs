export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data?: T | null;
  error?: string | object | null;
  timestamp: Date;
}