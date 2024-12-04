import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from '../entities/video.entity';
import { VideoActivity } from '../entities/video-activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Video, VideoActivity])],
  controllers: [VideoController],
  providers: [VideoService]
})
export class VideoModule {}
