import { HttpException } from '@nestjs/common';

import { SimpleException } from '../exceptions';
import { SimpleExceptionFilter } from './simple-exception.filter';

/**
 * 创建伪造的 HTTP 响应对象
 */
function createStubResponse() {
  return {
    status: jest.fn(),
    json: jest.fn(),
  };
}

/**
 * 创建伪造的 ArgumentsHost
 */
function createStubHost(resp: any) {
  return {
    switchToHttp: () => ({
      getResponse: () => resp,
    }),
  } as any;
}

describe('SimpleExceptionFilter 异常过滤器', () => {
  /**
   * 业务异常：返回错误消息并状态码 200
   */
  it('处理 SimpleException：返回 200 与错误消息', () => {
    const response = createStubResponse();
    const host = createStubHost(response);
    const filter = new SimpleExceptionFilter();
    filter.catch(new SimpleException('业务错误'), host);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      success: false,
      message: '业务错误',
    });
  });

  /**
   * HttpException：提取异常消息
   */
  it('处理 HttpException：提取并返回错误消息', () => {
    const response = createStubResponse();
    const host = createStubHost(response);
    const filter = new SimpleExceptionFilter();
    filter.catch(new HttpException('http 错误', 500), host);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      success: false,
      message: 'http 错误',
    });
  });

  /**
   * 其他异常：统一返回服务器错误
   */
  it('处理其他错误：统一返回服务器错误消息', () => {
    const response = createStubResponse();
    const host = createStubHost(response);
    const filter = new SimpleExceptionFilter();
    filter.catch(new Error('boom'), host);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      success: false,
      message: '服务器错误',
    });
  });
});
