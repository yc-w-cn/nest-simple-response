import {
  ApiSimpleArrayResponse,
  ApiSimpleBaseResponse,
  ApiSimpleBooleanResponse,
  ApiSimpleNumberResponse,
  ApiSimpleResponse,
  ApiSimpleStringResponse,
} from './index';

class DummyModel {}

describe('Swagger 装饰器', () => {
  it('ApiSimpleBaseResponse 返回函数', () => {
    const d = ApiSimpleBaseResponse();
    expect(typeof d).toBe('function');
  });

  it('ApiSimpleStringResponse 返回函数', () => {
    const d = ApiSimpleStringResponse();
    expect(typeof d).toBe('function');
  });

  it('ApiSimpleNumberResponse 返回函数', () => {
    const d = ApiSimpleNumberResponse();
    expect(typeof d).toBe('function');
  });

  it('ApiSimpleBooleanResponse 返回函数', () => {
    const d = ApiSimpleBooleanResponse();
    expect(typeof d).toBe('function');
  });

  it('ApiSimpleResponse(model) 返回函数', () => {
    const d = ApiSimpleResponse(DummyModel);
    expect(typeof d).toBe('function');
  });

  it('ApiSimpleArrayResponse(model) 返回函数', () => {
    const d = ApiSimpleArrayResponse(DummyModel);
    expect(typeof d).toBe('function');
  });
});
