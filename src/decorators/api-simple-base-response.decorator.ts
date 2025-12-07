import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { SimpleBaseResponseDto } from '../dtos';

/**
 * 基础响应装饰器
 * 用于只需要返回成功/失败状态和消息的场景
 */
export const ApiSimpleBaseResponse = () => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        $ref: getSchemaPath(SimpleBaseResponseDto),
      },
    }),
  );
};
