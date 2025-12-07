import { ApiProperty } from '@nestjs/swagger';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export class SimpleResponseDto<T = any> {
  @ApiProperty({
    type: Boolean,
    description: '表示请求是否成功',
  })
  success: boolean;

  @ApiProperty({
    description: '请求返回的数据',
    required: false,
    type: Object,
  })
  data?: T;

  @ApiProperty({
    type: String,
    description: '与响应相关的消息',
    required: false,
  })
  message?: string;
}
