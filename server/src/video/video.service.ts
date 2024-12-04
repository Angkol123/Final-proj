import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from '../entities/video.entity';
import { VideoActivity } from '../entities/video-activity.entity';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class VideoService {
    private readonly logger = new Logger(VideoService.name);

    constructor(
        private configService: ConfigService,
        @InjectRepository(Video)
        private videoRepository: Repository<Video>,
        @InjectRepository(VideoActivity)
        private videoActivityRepository: Repository<VideoActivity>
    ) {
        cloudinary.config({
            cloud_name: this.configService.get<string>('CLOUD_NAME'),
            api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
            api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
        });
    }

    async uploadVideo(file: Express.Multer.File, name: string, description: string) {
        try {
            const result = await cloudinary.uploader.upload(file.path, {
                resource_type: 'video',
            });

            const video = new Video();
            video.name = name;
            video.description = description;
            video.url = result.secure_url;

            const activity = await this.videoActivityRepository.save({
                action: 'upload',
                videoName: name,
                timestamp: new Date()
            });

            this.logger.log(`Video activity logged: ${JSON.stringify(activity)}`);
            return await this.videoRepository.save(video);
        } catch (error) {
            this.logger.error(`Error in uploadVideo: ${error.message}`);
            throw error;
        }
    }

    async getAllVideos() {
        return this.videoRepository.find();
    }

    async deleteVideo(id: number) {
        try{
            const video = await this.videoRepository.findOne({ where: { id } });
            if(!video) {
                throw new Error('Video not Found');
            }

            const publicId = video.url.split('/').slice(-1)[0].split('_')[0];

            await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });

            return await this.videoRepository.delete(id);
        } catch (error) {
            console.error('Error deleting video:', error);
            throw new Error('Failed to delete video');
        }
    }

    async updateVideo(id: number, updateData: { name?: string, description?: string }) {
        try{
            const video = await this.videoRepository.findOne({ where: { id } });
            if(!video) {
                throw new Error('Video not Found');
            }

            Object.assign(video, updateData);
            return await this.videoRepository.save(video);
        } catch (error) {
            console.error('Error updating Video:', error);
            throw new Error('Failed to Update Video');
        }
    }

    async getAllActivities() {
        try {
            const activities = await this.videoActivityRepository.find({
                order: { timestamp: 'DESC' },
                take: 10
            });
            this.logger.log(`Retrieved ${activities.length} activities`);
            return activities;
        } catch (error) {
            this.logger.error(`Error getting activities: ${error.message}`);
            throw error;
        }
    }
}
