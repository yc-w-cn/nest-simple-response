import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { SimpleBaseResponseDto } from '../dtos';

export const ApiSimpleBooleanResponse = () => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(SimpleBaseResponseDto) },
          {
            properties: {
              data: {
                type: 'boolean',
              },
            },
            required: ['data'], // 指定 data 为必填字段
          },
        ],
      },
    }),
  );
};
