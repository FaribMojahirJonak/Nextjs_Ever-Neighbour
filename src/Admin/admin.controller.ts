import { BadRequestException, Body, Controller, Delete, Get, Res, Request, Param, ParseIntPipe, Patch, Post, Put, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ResidentEntity } from 'src/Resident/ENTITY/resident.entity';
import { AdminService } from './admin.service';
import { AdminRegistrationDTO, AdminEventAnnouncementDTO, UserUpdateDTO, LoginDTO, AdminUpdateDTO } from './admin.dto';
import { registrationDTO } from 'src/Resident/DTO/resident.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { AdminAnnouncedEventEntity, AdminAnnouncedPostEntity } from './admin.entity';
import { AuthService } from "./auth/auth.service";
import { AuthGuard } from './auth/auth.guard';

@Controller('/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  // get all residents
  @UseGuards(AuthGuard)
  @Get('/getallresidents')
  getAllUsers(): Promise<ResidentEntity[]> {
    return this.adminService.getAllUsers();
  }

  // delete resident by id
  @UseGuards(AuthGuard)
  @Delete('deleteresident/:id')
  deleteUserById(@Param('id', ParseIntPipe) id: number): object {
    return this.adminService.deleteUserById(id);
  }

  // update resident information by id
  @UseGuards(AuthGuard)
  @Put('/updateresident/:id')
  @UsePipes(new ValidationPipe())
  updateUserbyID(@Param('id', ParseIntPipe) id: number, @Body() data: UserUpdateDTO): object {
    return this.adminService.updateUserById(id, data);
  }

  // add resident
  @UseGuards(AuthGuard)
  @Post('/addresident')
  @UsePipes(ValidationPipe)
  async addUser(@Body() user: registrationDTO): Promise<registrationDTO> {
    return this.adminService.addUser(user);
  }

  // local event announcement
  @UseGuards(AuthGuard)
  @Post('addevent')
  @UseInterceptors(FileInterceptor('myfile',
    {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 3000000 },
      storage: diskStorage({
        destination: './upload',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname)
        },
      })
    }
  ))
  @UsePipes(new ValidationPipe)
  async addEvent(@Body() myobj: AdminEventAnnouncementDTO, @UploadedFile() myfile: Express.Multer.File): Promise<AdminEventAnnouncementDTO> {
    myobj.filename = myfile.filename;
    return this.adminService.addEvent(myobj);
  }

  // delete local event
  @UseGuards(AuthGuard)
  @Delete('deleteevent/:id')
  deleteEventById(@Param('id', ParseIntPipe) id: number): object {
    return this.adminService.deleteEventById(id);
  }

  // post comments
  @UseGuards(AuthGuard)
  @Post('addpost/:adminid')
  async addpost(@Param('adminid') adminid: string, @Body() myobj: AdminAnnouncedPostEntity,): Promise<AdminAnnouncedPostEntity> {

    return this.adminService.addPost(adminid, myobj);
  }

  // delete posts
  @UseGuards(AuthGuard)
  @Delete('deletepost/:id')
  deletePostById(@Param('id', ParseIntPipe) id: number): object {
    return this.adminService.deletePostById(id);
  }

  // view admin posted event
  @UseGuards(AuthGuard)
  @Get('viewevents')
  getAllEvents(): Promise<AdminAnnouncedEventEntity[]> {
    return this.adminService.getAllEvents();
  }

  // view admin posted announcements
  @UseGuards(AuthGuard)
  @Get('viewblogs')
  getAllPosts(): Promise<AdminAnnouncedPostEntity[]> {
    return this.adminService.getAllPosts();
  }

  // get resident by id
  @UseGuards(AuthGuard)
  @Get('getresidentbyid/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<object> {
    return this.adminService.getUserById(id);
  }

  // get event by id
  @UseGuards(AuthGuard)
  @Get('geteventbyid/:id')
  async getEventById(@Param('id', ParseIntPipe) id: number): Promise<object> {
    return this.adminService.getEventById(id);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // update admin information 
  @UseGuards(AuthGuard)
  @Put('/updateadmin/:id')
  @UsePipes(new ValidationPipe())
  updateAdminbyID(@Param('id') id: string, @Body() data: AdminUpdateDTO): object {
    return this.adminService.updateAdminById(id, data);
  }

  @Get('/getimage/:name')
  getImages(@Param('name') name: string, @Res() res) {
    res.sendFile(name, { root: './upload' })
  }

  // get admin by email
  @UseGuards(AuthGuard)

  @Get('getadmin/:email')
  getUserByEmail(@Param('email') email: string): object {
    return this.adminService.getAdminByEmail(email);
  }

  /* // get admin by id
  @Get('getadminbyid/:id')
  async getAdminById(@Param('id') adminId: string): Promise<object> {
    return this.adminService.getAdminById(adminId);
  } */

  /* // get resident by partial match(Search by name)
  @Get('getresidentsbyname/:name')
  getUsersByName(@Param('name') name: string){
      return this.adminService.getUsersByName(name);
  }
 */
}
