# @yc-w-cn/nest-simple-response

一个用于 Nest.js 框架的简单响应格式化工具，提供统一的 API 响应格式和 Swagger 文档装饰器。

## 功能特性

- 统一的 API 响应格式
- 支持 Swagger 文档自动生成
- 提供便捷的响应工具类
- 支持多种数据类型的响应装饰器
- 集成日志记录

## 安装

```bash
pnpm add @yc-w-cn/nest-simple-response
```

## 使用示例

### 1. 使用响应工具类

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

## 许可证

MIT License

## 作者

Yuchen Wang - contact@wangyuchen.cn
