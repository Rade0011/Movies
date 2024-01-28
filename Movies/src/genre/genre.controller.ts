import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Req, HttpStatus } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Public } from '../decorators/public.decorators';
import { Role } from 'src/helpers/constans';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorators/roles.decorators';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger/dist';
import { MovieService } from 'src/movie/movie.service';
import mongoose from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { Request } from 'express';


@ApiBearerAuth()
@ApiTags('genre')
@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService,
  private readonly movieService: MovieService,
  @InjectConnection() private connection: mongoose.Connection
  ) {}

  @Roles(Role.Admin)
  @Post()
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.create(createGenreDto);
  }

  @Public() // проверить
  @Get()
  findAll(@Headers('Authorization') authUser: string) {
    if (authUser) {
    return this.genreService.findAll();
    } else {
      return this.genreService.findAllNoToken();
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genreService.findOne(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genreService.update(id, updateGenreDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
 async remove(@Param('id') id: string,  @Req() req: Request,) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      await this.movieService.removeGenreFromPlaylist(id, session);
      await this.genreService.remove(id, session);
      await session.commitTransaction();
      return HttpStatus.OK;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
  }
  }
