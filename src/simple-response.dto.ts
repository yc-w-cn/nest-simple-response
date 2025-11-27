import { ApiProperty } from '@nestjs/swagger';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export class SimpleResponseDto<T = any> {
  @ApiProperty({
    type: Boolean,
    description: 'Indicates if the request was successful',
  })
  success: boolean;

  @ApiProperty({
    description: 'The data returned by the request',
    required: false,
    type: Object,
  })
  data?: T;

  @ApiProperty({
    type: String,
    description: 'A message associated with the response',
    required: false,
  })
  message?: string;
}
