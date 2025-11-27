import { EasyLogger } from '@yc-w-cn/nest-easy-logger';

export class SimpleResponseUtil {
  private readonly logger: EasyLogger;

  constructor(initLogger: string | EasyLogger) {
    if (typeof initLogger === 'string') {
      this.logger = new EasyLogger(initLogger);
    } else if (initLogger) {
      this.logger = initLogger;
    } else {
      this.logger = new EasyLogger(SimpleResponseUtil.name);
    }
  }

  public success<T = any>(message?: string, data?: T) {
    const response = {
      success: true,
      message,
      data,
    };
    this.logger.debug('操作成功', response);
    return response;
  }

  public data<T = any>(data?: T) {
    return this.success<T>('操作成功', data);
  }

  public error<T = any>(data?: T) {
    return this.fail<T>('操作失败', data);
  }

  public fail<T = any>(message?: string, data?: T) {
    const response = {
      success: false,
      message,
      data,
    };
    this.logger.error('操作失败', response);
    return response;
  }
  public static success<T = any>(message?: string, data?: T) {
    const logger = new EasyLogger(SimpleResponseUtil.name);
    const util = new SimpleResponseUtil(logger);
    return util.success(message, data);
  }
  public static fail<T = any>(message?: string, data?: T) {
    const logger = new EasyLogger(SimpleResponseUtil.name);
    const util = new SimpleResponseUtil(logger);
    return util.fail(message, data);
  }
}
