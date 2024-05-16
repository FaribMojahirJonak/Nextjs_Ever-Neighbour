import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResidentEntity } from 'src/Resident/ENTITY/resident.entity';
import { AdminAnnouncedEventEntity, AdminAnnouncedPostEntity, AdminEntity } from './admin.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([ResidentEntity,AdminAnnouncedEventEntity, AdminEntity, AdminAnnouncedPostEntity]),
  JwtModule.register({
    global: true,
    secret: "3NP_Backend_Admin",
    signOptions: { expiresIn: '30m' },
  }),
],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
