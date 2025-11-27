import { ApiProperty } from '@nestjs/swagger';

import { SimpleResponseDto } from './simple-response.dto';

export class SimpleNumberResponseDto extends SimpleResponseDto<number> {
  @ApiProperty({
    description: '请求返回的数据',
    required: false,
    type: Number,
  })
  declare data?: number;
}
