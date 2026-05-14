import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Prisma } from '@careline/shared/prisma/client';
import { Request, Response } from 'express';

// Only catch MyCustomError instances
@Catch(Prisma.PrismaClientKnownRequestError)
export class DbConnectionErrorFilter implements ExceptionFilter {
    catch(exception: Prisma.PrismaClientUnknownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        if (exception.code === 'ETIMEDOUT') {
            response
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    message: 'Database connection timed out',
                });
        } else if (exception.code === "P1001") {
            response
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    message: 'Can not connect to database check your connection',
                });
        }

        console.error(exception);
        response
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: 'Something Went Wrong. Please try again later',
            });
    }
}