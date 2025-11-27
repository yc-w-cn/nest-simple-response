import { ApiProperty } from '@nestjs/swagger';

import { SimpleResponseDto } from './simple-response.dto';

export class SimpleArrayResponseDto<T = any> extends SimpleResponseDto<T[]> {
  @ApiProperty({
    description: 'The data returned by the request',
    required: false,
    type: Array,
  })
  declare data?: T[];
}
