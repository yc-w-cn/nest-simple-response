# 变更记录

## [1.1.0] - 2025-12-20

### 新增

- SimpleResponseUtil 初始化新增配置项 `silence`：开启时不打印任何日志
- 新增配置项 `warnOnError`：开启时错误日志降级为 warn
- 更新 README，补充配置项使用说明
- 增加单元测试并提升代码覆盖率

## [1.0.5] - 2025-12-08

### 新增

- 新增基础响应装饰器 `@ApiSimpleBaseResponse()`
  - 直接引用 SimpleBaseResponseDto
  - 用于只需要返回成功/失败状态和消息的场景

## [1.0.4] - 2025-12-07

### 重构

- 重构简单响应相关装饰器和 DTO 结构
  - 替换简单响应装饰器中引用的 DTO 类型从 SimpleResponseDto 到 SimpleBaseResponseDto
  - 新增 ApiSimpleBooleanResponse 装饰器，支持布尔类型的简单响应
  - 删除 SimpleResponseDto、SimpleArrayResponseDto、SimpleNumberResponseDto 等旧 DTO 类
  - 新建 SimpleBaseResponseDto，简化响应结构只包含 success 和 message 字段
  - 更新装饰器导出，加入新 Boolean 类型响应装饰器，移除旧 DTO 导出
  - 优化 Swagger 接口文档更清晰简洁，移除多余的数据字段声明

## [1.0.3] - 2025-12-07

### 重构

- 移动代码文件到文件夹，便于统一导入
  - 装饰器文件移动到 `decorators/` 文件夹
  - DTO 文件移动到 `dtos/` 文件夹
  - 异常文件移动到 `exceptions/` 文件夹
  - 过滤器文件移动到 `filters/` 文件夹
  - 类型文件移动到 `types/` 文件夹
  - 工具类文件移动到 `utils/` 文件夹

## [1.0.2] - 2025-12-01

### 新增

- 友好异常处理功能
  - `SimpleExceptionFilter` - 全局异常过滤器
  - `SimpleException` - 友好业务异常类

## [1.0.1] - 2025-11-29

### 新增

- 自动注册响应类型

## [1.0.0] - 2025-11-27

### 新增
- 初始版本发布
- 统一的 API 响应格式
- 支持 Swagger 文档自动生成的装饰器
- 便捷的响应工具类
- 支持多种数据类型的响应装饰器
  - `@ApiSimpleResponse` - 对象类型响应
  - `@ApiSimpleArrayResponse` - 数组类型响应
  - `@ApiSimpleNumberResponse` - 数字类型响应
  - `@ApiSimpleStringResponse` - 字符串类型响应
- 集成日志记录功能
- 支持实例化和静态方法调用
