import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { SimpleResponseDto } from './simple-response.dto';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const ApiSimpleArrayResponse = <TModel extends Type>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(model), // 自动注册
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(SimpleResponseDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
            required: ['data'], // 指定 data 为必填字段
          },
        ],
      },
    }),
  );
};
