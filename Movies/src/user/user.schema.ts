import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Playlist } from "src/playlist/playlist.schema";

export type UserDocument = mongoose.Document & User;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop({default: ['user']})
  roles: string[];

  @Prop()
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }] })
  playlist: Playlist[];

  @Prop()
  token?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);