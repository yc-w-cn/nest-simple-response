import { EasyLogger } from '@yc-w-cn/nest-easy-logger';

import type { SimpleResponseUtilOptions } from '../types';

export class SimpleResponseUtil {
  private readonly logger: EasyLogger;
  private readonly opts: SimpleResponseUtilOptions;

  /**
   * 初始化响应工具
   * 支持配置项：silence 禁止日志；warnOnError 将错误级别降为 warn
   */
  constructor(
    initLogger: string | EasyLogger,
    options?: SimpleResponseUtilOptions,
  ) {
    if (typeof initLogger === 'string') {
      this.logger = new EasyLogger(initLogger);
    } else if (initLogger) {
      this.logger = initLogger;
    } else {
      this.logger = new EasyLogger(SimpleResponseUtil.name);
    }
    this.opts = options ?? {};
  }

  /**
   * 成功响应
   */
  public success<T = any>(message?: string, data?: T) {
    const response = {
      success: true,
      message,
      data,
    };
    if (!this.opts.silence) {
      this.logger.debug('操作成功', response);
    }
    return response;
  }

  /**
   * 成功响应简写
   */
  public data<T = any>(data?: T) {
    return this.success<T>('操作成功', data);
  }

  /**
   * 错误响应简写
   */
  public error<T = any>(data?: T) {
    return this.fail<T>('操作失败', data);
  }

  /**
   * 失败响应
   * 当 warnOnError=true 时，使用 warn 级别记录错误
   */
  public fail<T = any>(message?: string, data?: T) {
    const response = {
      success: false,
      message,
      data,
    };
    if (!this.opts.silence) {
      if (this.opts.warnOnError) {
        this.logger.warn('操作失败', response);
      } else {
        this.logger.error('操作失败', response);
      }
    }
    return response;
  }
  /**
   * 静态成功响应
   */
  public static success<T = any>(
    message?: string,
    data?: T,
    options?: SimpleResponseUtilOptions,
  ) {
    const logger = new EasyLogger(SimpleResponseUtil.name);
    const util = new SimpleResponseUtil(logger, options);
    return util.success(message, data);
  }
  /**
   * 静态失败响应
   */
  public static fail<T = any>(
    message?: string,
    data?: T,
    options?: SimpleResponseUtilOptions,
  ) {
    const logger = new EasyLogger(SimpleResponseUtil.name);
    const util = new SimpleResponseUtil(logger, options);
    return util.fail(message, data);
  }
}
