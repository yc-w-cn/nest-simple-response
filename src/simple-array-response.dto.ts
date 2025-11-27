import { ApiProperty } from '@nestjs/swagger';

import { SimpleResponseDto } from './simple-response.dto';

export class SimpleArrayResponseDto<T = any> extends SimpleResponseDto<T[]> {
  @ApiProperty({
    description: '请求返回的数据',
    required: false,
    type: Array,
  })
  declare data?: T[];
}
