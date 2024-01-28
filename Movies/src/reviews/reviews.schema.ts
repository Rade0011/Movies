import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/user.schema';

export type ReviewDocument = HydratedDocument<Review>;

@Schema()
export class Review {
    @Prop({ type:  mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop()
    feedback: string;

    @Prop({min: 0, max: 10})
    rating: number
}

export const ReviewSchema = SchemaFactory.createForClass(Review);