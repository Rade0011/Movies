import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

export type GenreDocument = HydratedDocument<Genre>;

@Schema()
export class Genre {
    @Prop({required: true})
    genre: string
}

export interface GenreName {
    name: string
}

export const GenreSchema = SchemaFactory.createForClass(Genre);