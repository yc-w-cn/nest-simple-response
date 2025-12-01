# @yc-w-cn/nest-simple-response

一个用于 Nest.js 框架的简单响应格式化工具，提供统一的 API 响应格式和 Swagger 文档装饰器。

## 功能特性

- 统一的 API 响应格式
- 支持 Swagger 文档自动生成
- 提供便捷的响应工具类
- 支持多种数据类型的响应装饰器
- 集成日志记录
- 友好异常处理

## 安装

```bash
pnpm add @yc-w-cn/nest-simple-response
```

## 使用示例

### 1. 使用响应工具类

### 2. 友好异常处理示例

 ```typescript
 import { Controller, Get, UseFilters } from '@nestjs/common';
 import { SimpleResponseUtil, SimpleExceptionFilter, SimpleException } from '@yc-w-cn/nest-simple-response';
 
 @Controller('test')
 @UseFilters(new SimpleExceptionFilter())
 export class TestController {
   @Get('exception')
   testException() {
     // 当抛出异常时，会被 SimpleExceptionFilter 捕获并格式化为统一的响应格式
     throw new Error('测试异常');
   }
 
   @Get('custom-exception')
   testCustomException() {
     // 使用 SimpleException 抛出业务异常
     throw new SimpleException('业务异常消息');
   }
 
   @Get('http-exception')
   testHttpException() {
     // 自定义异常处理
     return SimpleResponseUtil.fail('自定义错误消息', { code: 'CUSTOM_ERROR' });
   }
 }
 ```

### 3. 使用 Swagger 装饰器

```typescript
import { SimpleResponseUtil } from '@yc-w-cn/nest-simple-response';

// 实例化工具类
const responseUtil = new SimpleResponseUtil('MyController');

// 成功响应
return responseUtil.success('操作成功', { id: 1, name: '测试数据' });

// 简写形式
return responseUtil.data({ id: 1, name: '测试数据' });

// 失败响应
return responseUtil.fail('操作失败', { error: '参数错误' });

// 静态方法调用
return SimpleResponseUtil.success('操作成功', { id: 1, name: '测试数据' });
return SimpleResponseUtil.fail('操作失败');
```

### 2. 使用 Swagger 装饰器

```typescript
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiSimpleResponse, SimpleResponseUtil } from '@yc-w-cn/nest-simple-response';

@ApiTags('测试')
@Controller('test')
export class TestController {
  @Get()
  @ApiSimpleResponse(UserDto) // 用于对象类型响应
  getTest() {
    return SimpleResponseUtil.success('操作成功', { id: 1, name: '测试用户' });
  }

  @Get('list')
  @ApiSimpleArrayResponse(UserDto) // 用于数组类型响应
  getList() {
    return SimpleResponseUtil.success('操作成功', [{ id: 1, name: '测试用户1' }, { id: 2, name: '测试用户2' }]);
  }

  @Get('count')
  @ApiSimpleNumberResponse() // 用于数字类型响应
  getCount() {
    return SimpleResponseUtil.success('操作成功', 100);
  }

  @Get('message')
  @ApiSimpleStringResponse() // 用于字符串类型响应
  getMessage() {
    return SimpleResponseUtil.success('操作成功', '测试消息');
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

- `@ApiSimpleResponse(model)` - 用于对象类型响应
- `@ApiSimpleArrayResponse(model)` - 用于数组类型响应
- `@ApiSimpleNumberResponse()` - 用于数字类型响应
- `@ApiSimpleStringResponse()` - 用于字符串类型响应

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
