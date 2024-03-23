import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  Get,
  Param,
} from '@nestjs/common';
import { ResidentService } from './resident.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  BuyBookDTO,
  LoginDTO,
  SearchDTO,
  registrationDTO,
} from './DTO/resident.dto';
import { BookEntity, MyBookEntity } from './ENTITY/resident.entity';

@Controller('user')
export class residentController {
  constructor(private readonly residentService: ResidentService) {}

  //1.---------------------------------user registration(create new user)
  @Post('/registration')
  @UsePipes(ValidationPipe)
  registration(@Body() registrationDTO: registrationDTO): any {
    return this.residentService.registration(registrationDTO);
  }

  //2.---------------------------------login
  @Post('login')
  async login(@Body() LoginDTO: LoginDTO) {
    const { email, password } = LoginDTO;
    const user = await this.residentService.login(email, password);
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    return { message: 'Login successful' };
  }

  //3---------------------------------buy book
  @Post('/buy-book')
  async buyBook(@Body() buyBookDTO: BuyBookDTO): Promise<BookEntity> {
    return this.residentService.buyBook(buyBookDTO.bookName);
  }

  //4.---------------------------------buy book
  @Get('findbook/:name')
  @UsePipes(new ValidationPipe())
  async findBookByName(@Param() searchDTO: SearchDTO): Promise<string> {
    return this.residentService.findByName(searchDTO.name);
  }

  //5.---------------------------------view all book
  @Get('/view-all-books')
  async viewAllBooks(): Promise<BookEntity[] | string> {
    return await this.residentService.viewAllBooks();
  }

  @Get('/view-myBook')
  async viewMyBooks(): Promise<MyBookEntity[] | string> {
    return await this.residentService.viewMyBooks();
  }
}
