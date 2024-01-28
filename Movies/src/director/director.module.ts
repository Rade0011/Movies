import { Module } from '@nestjs/common';
import { DirectorService } from './director.service';
import { DirectorController } from './director.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Director, DirectorSchema } from './director.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Director.name, schema: DirectorSchema }]),
  ],
  controllers: [DirectorController],
  providers: [DirectorService],
})
export class DirectorModule {}
