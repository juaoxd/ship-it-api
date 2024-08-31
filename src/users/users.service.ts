import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash, genSalt } from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<number> {
    const { name, email, password } = createUserDto;

    const emailIsRegistered = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (emailIsRegistered) {
      throw new BadRequestException('Email already registered');
    }

    const salt = await genSalt(10);

    const hashedPassword = await hash(password, salt);

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password_hash: hashedPassword,
      },
    });

    return user.id;
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async findOne(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
