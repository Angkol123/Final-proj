import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from '../entities/game.entity';
import { CreateGameDto } from '../Dto/create-game.dto';
import { format } from 'date-fns';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
  ) {}

  async create(createGameDto: CreateGameDto): Promise<Game> {
    const game = this.gamesRepository.create(createGameDto);
    return await this.gamesRepository.save(game);
  }

  async findAll(): Promise<any[]> {
    const games = await this.gamesRepository.find();
    return games.map((game) => ({
      ...game,
      playDate: this.formatDate(new Date(game.playDate)), // Convert ISO string to Date object
    }));
  }

  private formatDate(date: Date): string {
    return format(date, 'MM/dd/yyyy hh:mma'); // Formats the date as MM/DD/YYYY hh:mmam/pm
  }
}
