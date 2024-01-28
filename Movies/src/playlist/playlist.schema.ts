import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {HydratedDocument} from "mongoose";
import { Movie } from "src/movie/movie.schema";
import { User } from "src/user/user.schema"

export type PlaylistDocument = HydratedDocument<Playlist>;

@Schema()
export class Playlist {
    @Prop()
    title: string;

    @Prop({type: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Movie'}]})
    movie: Movie[];

    @Prop({ type:  mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({default: true})
    condition: boolean;

    @Prop({default: 0})
    entriesCount: number

}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
