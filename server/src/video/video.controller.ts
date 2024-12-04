import { Controller, Body, Post, Put, Delete, Get, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { VideoService } from './video.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('video')
export class VideoController {
    constructor(private readonly videoService: VideoService){}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', { storage: diskStorage({}) }))
    async uploadVideo(
        @UploadedFile() file: Express.Multer.File,
        @Body('name') name: string,
        @Body('description') description: string,
    ) {
        return this.videoService.uploadVideo(file, name, description);
    }

    @Get()
    async getAllVideos() {
        return this.videoService.getAllVideos();
    }

    @Delete(':id')
    async deleteVideo(@Param('id') id: number) {
        return this.videoService.deleteVideo(id);
    }

    @Put(':id')
    async updateVideo(
        @Param('id') id: number,
        @Body('name') name?: string,
        @Body('description') description?: string,
    ) {
        return this.videoService.updateVideo(id, { name, description });
    }

    @Get('activities')
    async getVideoActivities() {
        return this.videoService.getAllActivities();
    }
}
