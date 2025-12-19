# @yc-w-cn/nest-simple-response

一个用于 Nest.js 框架的简单响应格式化工具，提供统一的 API 响应格式和 Swagger 文档装饰器。

## 功能特性

- 统一的 API 响应格式
- 支持 Swagger 文档自动生成
- 提供便捷的响应工具类
- 支持多种数据类型的响应装饰器
- 集成日志记录
- 友好异常处理
- 可配置日志输出（`silence`、`warnOnError`）

## 安装

```bash
pnpm add @yc-w-cn/nest-simple-response
```

## 使用示例

### 响应工具类

```typescript
import { SimpleResponseUtil } from '@yc-w-cn/nest-simple-response';

// 实例化响应工具，传入可选的模块/控制器名称，便于日志标识
const responseUtil = new SimpleResponseUtil('MyController');

// 成功响应（包含消息与数据）
return responseUtil.success('操作成功', { id: 1, name: '测试数据' });
// 成功响应（data 简写，不含 message）
return responseUtil.data({ id: 1, name: '测试数据' });
// 失败响应（包含错误详情）
return responseUtil.fail('操作失败', { error: '参数错误' });

// 静态调用：成功响应
return SimpleResponseUtil.success('操作成功', { id: 1, name: '测试数据' });
// 静态调用：失败响应
return SimpleResponseUtil.fail('操作失败');
```

### 配置项

```typescript
// silence: 静默模式，不输出日志
const quietUtil = new SimpleResponseUtil('MyController', { silence: true });
// 成功响应（静默模式）
quietUtil.success('操作成功', { id: 2 });
// 失败响应（静默模式）
quietUtil.fail('操作失败', { code: 'E001' });

// warnOnError: 失败时输出 warn 日志
const warnUtil = new SimpleResponseUtil('MyController', { warnOnError: true });
warnUtil.fail('操作失败', { code: 'E002' });

// 静态调用支持临时选项覆盖
SimpleResponseUtil.fail('操作失败', { code: 'E003' }, { warnOnError: true });
```

### 友好异常处理

```typescript
import { Controller, Get, UseFilters } from '@nestjs/common';
import { SimpleResponseUtil, SimpleExceptionFilter, SimpleException } from '@yc-w-cn/nest-simple-response';

@Controller('test')
@UseFilters(new SimpleExceptionFilter()) // 为控制器注册异常过滤器，统一错误响应
export class TestController {
  /**
   * 抛出普通异常，演示过滤器的默认处理行为
   */
  @Get('exception')
  testException() {
    throw new Error('测试异常');
  }

  /**
   * 抛出业务异常，直接返回业务错误消息
   */
  @Get('custom-exception')
  testCustomException() {
    throw new SimpleException('业务异常消息');
  }

  /**
   * 返回自定义错误响应，用于 HTTP 异常案例
   */
  @Get('http-exception')
  testHttpException() {
    return SimpleResponseUtil.fail('自定义错误消息', { code: 'CUSTOM_ERROR' });
  }
}
```

### Swagger 装饰器

```typescript
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiSimpleResponse,
  ApiSimpleArrayResponse,
  ApiSimpleNumberResponse,
  ApiSimpleStringResponse,
  ApiSimpleBooleanResponse,
  ApiSimpleBaseResponse,
  SimpleResponseUtil,
} from '@yc-w-cn/nest-simple-response';

@ApiTags('测试') // 为文档标注分组标签
@Controller('test')
export class TestController {
  /**
   * 返回对象类型响应
   * 使用 ApiSimpleResponse 指定 Swagger 模型
   */
  @Get()
  @ApiSimpleResponse(UserDto)
  getTest() {
    return SimpleResponseUtil.success('操作成功', { id: 1, name: '测试用户' });
  }

  /**
   * 返回数组类型响应
   * 使用 ApiSimpleArrayResponse 指定元素模型
   */
  @Get('list')
  @ApiSimpleArrayResponse(UserDto)
  getList() {
    return SimpleResponseUtil.success('操作成功', [{ id: 1, name: '测试用户1' }, { id: 2, name: '测试用户2' }]);
  }

  /**
   * 返回数字类型响应
   */
  @Get('count')
  @ApiSimpleNumberResponse()
  getCount() {
    return SimpleResponseUtil.success('操作成功', 100);
  }

  /**
   * 返回字符串类型响应
   */
  @Get('message')
  @ApiSimpleStringResponse()
  getMessage() {
    return SimpleResponseUtil.success('操作成功', '测试消息');
  }

  /**
   * 返回布尔类型响应
   */
  @Get('flag')
  @ApiSimpleBooleanResponse()
  getFlag() {
    return SimpleResponseUtil.success('操作成功', true);
  }

  /**
   * 返回基础响应，不包含 data 字段
   */
  @Get('base')
  @ApiSimpleBaseResponse()
  getBase() {
    return SimpleResponseUtil.success('操作成功');
  }
}
```

## 响应格式

### 成功响应

```json
{
  "success": true,
  "message": "操作成功",
  "data": { /* 响应数据 */ }
}
```

### 失败响应

```json
{
  "success": false,
  "message": "操作失败",
  "data": { /* 错误数据 */ }
}
```

## 装饰器列表

- `@ApiSimpleBaseResponse()` - 基础响应，不包含 data 字段，只返回成功/失败状态和消息
- `@ApiSimpleResponse(model)` - 用于对象类型响应
- `@ApiSimpleArrayResponse(model)` - 用于数组类型响应
- `@ApiSimpleNumberResponse()` - 用于数字类型响应
- `@ApiSimpleStringResponse()` - 用于字符串类型响应
- `@ApiSimpleBooleanResponse()` - 用于布尔类型响应

## 工具类方法

### 实例方法

- `success(message?: string, data?: T)` - 返回成功响应
- `data(data?: T)` - 简写形式，返回成功响应
- `error(data?: T)` - 返回失败响应
- `fail(message?: string, data?: T)` - 返回失败响应

### 静态方法

- `SimpleResponseUtil.success(message?: string, data?: T)` - 静态调用成功响应
- `SimpleResponseUtil.fail(message?: string, data?: T)` - 静态调用失败响应

## 异常处理

### SimpleExceptionFilter

全局异常过滤器，统一处理各种异常并返回标准化的错误响应格式：

```json
{
  "success": false,
  "message": "错误消息"
}
```

**支持的异常类型：**
- `SimpleException`：业务异常，直接返回错误信息
- `HttpException`：NestJS 内置异常，提取错误信息
- 其他异常：统一返回"服务器错误"，并打印详细错误日志

### SimpleException

友好的业务异常类，用于抛出业务逻辑异常：

```typescript
throw new SimpleException('用户不存在');
```

### 全局注册

在 main.ts 中全局注册异常过滤器：

```typescript
import { SimpleExceptionFilter } from '@yc-w-cn/nest-simple-response';

app.useGlobalFilters(new SimpleExceptionFilter());
```

## 许可证

MIT License

## 作者

Yuchen Wang - contact@wangyuchen.cn
