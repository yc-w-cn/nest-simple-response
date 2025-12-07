# 变更记录

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
