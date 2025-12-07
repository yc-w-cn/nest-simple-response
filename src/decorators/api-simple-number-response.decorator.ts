import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { SimpleResponseDto } from '../dtos';

export const ApiSimpleNumberResponse = () => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(SimpleResponseDto) },
          {
            properties: {
              data: {
                type: 'number',
              },
            },
            required: ['data'], // 指定 data 为必填字段
          },
        ],
      },
    }),
  );
};
