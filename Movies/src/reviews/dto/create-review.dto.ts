import { ApiProperty } from '@nestjs/swagger'

export class CreateReviewDto {
    @ApiProperty()
    user: string;
    @ApiProperty()
    feedback: string;
    @ApiProperty()
    rating?: number
}
