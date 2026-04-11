import { Response } from 'express';

export const successResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data?: any
) => {
  return res.status(statusCode).json({
    ok: true,
    message,
    data: data ?? null
  });
};

export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  error?: any
) => {
  return res.status(statusCode).json({
    ok: false,
    message,
    error: error ?? null
  });
};