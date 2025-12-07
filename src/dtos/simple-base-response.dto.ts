import { ApiProperty } from '@nestjs/swagger';

export class SimpleBaseResponseDto {
  @ApiProperty({
    type: Boolean,
    description: '请求是否成功',
  })
  success: boolean;

  @ApiProperty({
    description: '请求返回的消息',
    required: false,
  })
  message?: string;
}
