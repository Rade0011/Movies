import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DirectorService } from './director.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { Role } from 'src/helpers/constans';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorators';
import { Roles } from 'src/decorators/roles.decorators';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger/dist';

@ApiBearerAuth()
@ApiTags('director')
@Controller('director')
export class DirectorController {
  constructor(private readonly directorService: DirectorService) {}

  @Roles(Role.Admin)
  @Post()
  create(@Body() createDirectorDto: CreateDirectorDto) {
    return this.directorService.create(createDirectorDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.directorService.findAll();
  }
  
  @Roles(Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.directorService.findOne(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDirectorDto: UpdateDirectorDto) {
    return this.directorService.update(id, updateDirectorDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.directorService.remove(id);
  }
}
