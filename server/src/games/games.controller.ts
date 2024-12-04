import { Controller, Post, Body, Get } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from '../Dto/create-game.dto';
import { Game } from '../entities/game.entity';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  async create(@Body() createGameDto: CreateGameDto): Promise<Game> {
    return this.gamesService.create(createGameDto); // Calls the service to create a new game
  }

  @Get()
  async findAll(): Promise<Game[]> {
    return this.gamesService.findAll(); // Retrieves all game records
  }
}
