import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { MovieService } from 'src/movie/movie.service';
import { UserService } from 'src/user/user.service';
import { PlaylistService } from 'src/playlist/playlist.service';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from 'src/helpers/constans';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService,
    private readonly movieService: MovieService,
    private readonly userService: UserService,
    private readonly playlistService: PlaylistService) {}
  
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Get()
  async generateReport() {
    return this.reportsService.generateReport()
  }
}
