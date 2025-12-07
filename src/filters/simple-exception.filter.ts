import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { EasyLogger } from '@yc-w-cn/nest-easy-logger';

import { SimpleException } from '../exceptions';

@Catch()
export class SimpleExceptionFilter implements ExceptionFilter {
  private logger = new EasyLogger('SimpleExceptionFilter');

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(200);

    if (exception instanceof SimpleException) {
      response.json({ success: false, message: exception.message });
    } else if (exception instanceof HttpException) {
      const res: any = exception.getResponse();
      response.json({
        success: false,
        message: res?.message ?? exception.message,
      });
    } else {
      response.json({ success: false, message: '服务器错误' });
      this.logger.error('服务器错误', exception);
    }
  }
}
