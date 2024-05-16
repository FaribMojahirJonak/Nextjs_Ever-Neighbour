import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
// import { AdminEntity } from './admin.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResidentEntity } from 'src/Resident/ENTITY/resident.entity';
import { AdminRegistrationDTO, UserUpdateDTO, LoginDTO, AdminUpdateDTO } from './admin.dto';
import { Like } from 'typeorm';
import { registrationDTO } from 'src/Resident/DTO/resident.dto';
import { AdminAnnouncedEventEntity, AdminAnnouncedPostEntity, AdminEntity } from './admin.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { emit } from "process";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminAnnouncedEventEntity)
    private adminRepo: Repository<AdminAnnouncedEventEntity>,
    @InjectRepository(ResidentEntity)
    private residentRepo: Repository<ResidentEntity>,
    @InjectRepository(AdminEntity)
    private adminRegistrationRepo: Repository<AdminEntity>,
    @InjectRepository(AdminAnnouncedPostEntity)
    private adminAnnouncedPostRepo: Repository<AdminAnnouncedPostEntity>,
  ) { }

  // registration
  async addAdmin(myobj: AdminEntity): Promise<AdminEntity> {
    return await this.adminRegistrationRepo.save(myobj);
  }

  //Login
  async findOne(logindata: LoginDTO): Promise<any> {
    return await this.adminRegistrationRepo.findOneBy({ email: logindata.email });
  }

  // get all residents
  async getAllUsers(): Promise<ResidentEntity[]> {
    return this.residentRepo.find();
  }

  // get admin by email
  async getAdminByEmail(email: string): Promise<AdminEntity> {
    return this.adminRegistrationRepo.findOneBy({ email: email });
  }

  // delete resident by id
  deleteUserById(id: number): object {
    return this.residentRepo.delete({ id: id })
  }

  // update resident information by id
  async updateUserById(id: number, data: UserUpdateDTO): Promise<ResidentEntity> {
    await this.residentRepo.update(id, data);
    return this.residentRepo.findOneBy({ id });
  }

  // add new resident
  async addUser(user: registrationDTO): Promise<registrationDTO> {
    await this.residentRepo.save(user);
    return user;
  }

  // local event announcement
  async addEvent(myobj: AdminAnnouncedEventEntity): Promise<AdminAnnouncedEventEntity> {
    return await this.adminRepo.save(myobj);
  }

  // delete event by id
  deleteEventById(id: number): object {
    return this.adminRepo.delete({ id: id })
  }

  // announcement
  async addPost(adminId: string, post: AdminAnnouncedPostEntity): Promise<AdminAnnouncedPostEntity> {
    console.log(adminId);
    const admin = await this.adminRegistrationRepo.findOneBy({ adminId: adminId });
    post.admin = admin;
    return this.adminAnnouncedPostRepo.save(post);
  }

  // delete posts by id
  deletePostById(id: number): object {
    return this.adminAnnouncedPostRepo.delete({ id: id })
  }

  // get all events
  async getAllEvents(): Promise<AdminAnnouncedEventEntity[]> {
    return this.adminRepo.find();
  }

  // get all announcements
  async getAllPosts(): Promise<AdminAnnouncedPostEntity[]> {
    return this.adminAnnouncedPostRepo.find();
  }

  // get resident by id
  async getUserById(id: number): Promise<object> {
    return await this.residentRepo.findOne({ where: { id } });
  }

  // get event by id
  async getEventById(id: number): Promise<object> {
    return await this.adminRepo.findOne({ where: { id } });
  }

  // update admin information by id
  async updateAdminById(id: string, data: AdminUpdateDTO): Promise<AdminEntity> {
    const salt = await bcrypt.genSalt();
    const hashedpassword = await bcrypt.hash(data.password, salt);
    data.password = hashedpassword;
    await this.adminRegistrationRepo.update(id, data);
    return this.adminRegistrationRepo.findOneBy({ adminId: id });
  }

  /* // get admin by id
  async getAdminById(adminId: string): Promise<object> {
    return await this.adminRegistrationRepo.findOneBy({ adminId });
  } */

  // get residents by partial match(Search by name)
  /* getUsersByName(name: string): Promise<ResidentEntity[]> {
    return this.residentRepo.find({
      where: {
        name: Like(`%${name}%`),
      },
    });
  } */
}
