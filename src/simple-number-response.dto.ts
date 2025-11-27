import { ApiProperty } from '@nestjs/swagger';

import { SimpleResponseDto } from './simple-response.dto';

export class SimpleNumberResponseDto extends SimpleResponseDto<number> {
  @ApiProperty({
    description: 'The data returned by the request',
    required: false,
    type: Number,
  })
  declare data?: number;
}
