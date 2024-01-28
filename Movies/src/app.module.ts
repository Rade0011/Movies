import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieModule } from './movie/movie.module';
import { GenreModule } from './genre/genre.module';
import { DirectorModule } from './director/director.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core'
import { JwtGuard } from './auth/guards/jwt.guards';
import { PlaylistModule } from './playlist/playlist.module';
import { RolesGuard } from './auth/guards/roles.guards';
import { ReportsModule } from './reports/reports.module';
import { MailModule } from './mail/mail.module';
import { ReviewsModule } from './reviews/reviews.module';
import { DB_CONNECTION_URL } from './helpers/config';


const globalJwtGuard = {
  provide: APP_GUARD,
  useClass: JwtGuard,
}

const globalRolesGuard = {
  provide: APP_GUARD,
  useClass: RolesGuard
}


@Module({
  imports: [MovieModule, 
    GenreModule, 
    DirectorModule, 
    UserModule, 
    MongooseModule.forRoot(DB_CONNECTION_URL),
    AuthModule,
    ConfigModule.forRoot(),
    PlaylistModule,
    ReportsModule,
    MailModule,
    ReviewsModule
    ],
  controllers: [AppController],
  providers: [AppService, globalJwtGuard, globalRolesGuard],
})

export class AppModule {}
