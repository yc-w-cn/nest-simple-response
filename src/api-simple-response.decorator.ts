import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { SimpleResponseDto } from './simple-response.dto';

export const ApiSimpleResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
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
