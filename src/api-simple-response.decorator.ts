import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { SimpleResponseDto } from './simple-response.dto';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const ApiSimpleResponse = <TModel extends Type>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(model), // 自动注册
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(SimpleResponseDto) },
          {
            properties: {
              data: {
                type: 'object',
                $ref: getSchemaPath(model), // 使用 model 的引用来定义 data 的结构
              },
            },
            required: ['data'], // 指定 data 为必填字段
          },
        ],
      },
    }),
  );
};
