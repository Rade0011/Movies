import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReportDocument = HydratedDocument<Report>;

@Schema()
export class Report {
  @Prop()
  totalMovies: number;

  @Prop()
  totalPlaylists: number;

  @Prop()
  totalUsers: number;
}

export const ReportSchema = SchemaFactory.createForClass(Report);