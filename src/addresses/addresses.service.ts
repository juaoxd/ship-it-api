import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Address } from '@prisma/client';

@Injectable()
export class AddressesService {
  constructor(private prisma: PrismaService) {}

  async create(createAddressDto: CreateAddressDto): Promise<number> {
    const address = await this.prisma.address.create({
      data: createAddressDto,
    });

    return address.id;
  }

  findAll() {
    return `This action returns all addresses`;
  }

  async findOne(id: number): Promise<Address | null> {
    return await this.prisma.address.findUnique({ where: { id } });
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
