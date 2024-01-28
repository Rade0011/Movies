import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {HydratedDocument} from "mongoose";
import { Genre } from '../genre/genre.schema';
import { Director } from '../director/director.schema';
import { Review } from "src/reviews/reviews.schema";

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  year: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }] })
  genre?: Genre[];

  @Prop({ required: true })
  duration: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Director' }] })
  director?: Director[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }] })
  reviews?: Review[];
  
}

export interface MovieName {
  name: string
}

export const MovieSchema = SchemaFactory.createForClass(Movie);