import { SimpleResponseUtil } from './simple-response-util';

/**
 * 创建用于验证日志调用的伪造 Logger
 */
function createStubLogger() {
  return {
    debug: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  } as any;
}

describe('SimpleResponseUtil 工具类', () => {
  /**
   * 验证 success 返回结构并输出 debug 日志
   */
  it('返回成功响应并记录 debug 日志', () => {
    const logger = createStubLogger();
    const util = new SimpleResponseUtil(logger);
    const res = util.success('操作成功', { id: 1 });
    expect(res).toEqual({
      success: true,
      message: '操作成功',
      data: { id: 1 },
    });
    expect(logger.debug).toHaveBeenCalled();
  });

  /**
   * 验证 data 为成功响应简写，message 默认“操作成功”
   */
  it('data 方法为成功响应的简写', () => {
    const logger = createStubLogger();
    const util = new SimpleResponseUtil(logger);
    const res = util.data({ id: 2 });
    expect(res).toEqual({
      success: true,
      message: '操作成功',
      data: { id: 2 },
    });
  });

  /**
   * 验证 fail 返回结构并默认输出 error 日志
   */
  it('返回失败响应并默认记录 error 日志', () => {
    const logger = createStubLogger();
    const util = new SimpleResponseUtil(logger);
    const res = util.fail('操作失败', { code: 'E001' });
    expect(res).toEqual({
      success: false,
      message: '操作失败',
      data: { code: 'E001' },
    });
    expect(logger.error).toHaveBeenCalled();
    expect(logger.warn).not.toHaveBeenCalled();
  });

  /**
   * 验证 fail 在 warnOnError=true 时输出 warn 而非 error
   */
  it('warnOnError=true 时记录 warn 而非 error', () => {
    const logger = createStubLogger();
    const util = new SimpleResponseUtil(logger, { warnOnError: true });
    util.fail('操作失败', { code: 'E002' });
    expect(logger.warn).toHaveBeenCalled();
    expect(logger.error).not.toHaveBeenCalled();
  });

  /**
   * 验证 silence=true 时不输出任何日志
   */
  it('silence=true 时不记录任何日志', () => {
    const logger = createStubLogger();
    const util = new SimpleResponseUtil(logger, { silence: true });
    util.success('操作成功', { id: 3 });
    util.fail('操作失败', { code: 'E003' });
    expect(logger.debug).not.toHaveBeenCalled();
    expect(logger.error).not.toHaveBeenCalled();
    expect(logger.warn).not.toHaveBeenCalled();
  });

  /**
   * 验证静态方法 success/fail 返回结构
   */
  it('静态方法返回预期的响应结构', () => {
    const ok = SimpleResponseUtil.success('操作成功', { id: 4 });
    const bad = SimpleResponseUtil.fail('操作失败', { code: 'E004' });
    expect(ok).toEqual({
      success: true,
      message: '操作成功',
      data: { id: 4 },
    });
    expect(bad).toEqual({
      success: false,
      message: '操作失败',
      data: { code: 'E004' },
    });
  });
});
