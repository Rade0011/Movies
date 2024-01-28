import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { OwnerReviewGuard } from 'src/auth/guards/reviewOwner.guards';
export const IS_OWNER_REVIEW = 'isOwner';
export const IsOwnerReview = () => {
    return applyDecorators(
        SetMetadata(IS_OWNER_REVIEW, true),
        UseGuards(OwnerReviewGuard),
      );
    };
