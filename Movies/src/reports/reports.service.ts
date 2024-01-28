import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MovieService } from 'src/movie/movie.service';
import { PlaylistService } from 'src/playlist/playlist.service';
import { UserService } from 'src/user/user.service';
import { Model } from 'mongoose';
import { Report, ReportDocument } from './reports.schema';
import * as schedule from 'node-schedule';

@Injectable()
export class ReportsService {
  constructor(@InjectModel(Report.name) private reportModel: Model<ReportDocument>,
  private movieService: MovieService,
  private playlistService: PlaylistService,
  private userService: UserService,) {
  const job = schedule.scheduleJob('*/2 * * * *', () => {   
    this.generateReport();
  });
}
  
  async generateReport(): Promise<Report> {
    const totalMovies = await this.movieService.countMovies();
    const totalPlaylists = await this.playlistService.countPlaylists();
    const totalUsers = await this.userService.countUsers();

    const report = new this.reportModel({
      totalMovies,
      totalPlaylists,
      totalUsers,
    });

    return report.save();
  }
}
