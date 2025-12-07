import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { SimpleBaseResponseDto } from '../dtos';

export const ApiSimpleStringResponse = () => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(SimpleBaseResponseDto) },
          {
            properties: {
              data: {
                type: 'string',
              },
            },
            required: ['data'], // 指定 data 为必填字段
          },
        ],
      },
    }),
  );
};
