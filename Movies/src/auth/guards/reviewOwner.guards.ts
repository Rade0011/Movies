import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { ERROR_MESSAGE } from 'src/helpers/constans'; 
import { ReviewsService } from 'src/reviews/reviews.service';
import { Review } from 'src/reviews/reviews.schema';
import { User } from 'src/user/user.schema';

@Injectable()
export class OwnerReviewGuard implements CanActivate {
    constructor( private readonly reviewsService: ReviewsService) {}

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { user } = request;
        const { id } = request.params;

        const review = await this.reviewsService.findOne(id)
        if (review) {
            const isOwner = this.isOwner(user, review)
            if (!isOwner) {
                throw new ForbiddenException(ERROR_MESSAGE.E_PERMISSIN)
            }
        }
        return true;
    }
    
    private isOwner(user: User, review: Review): boolean {
        return review.user.email === user.email
    }
}