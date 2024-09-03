import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { AddressesService } from './addresses.service';
import {
  CreateAddressDto,
  createAddressSchema,
} from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createAddressSchema))
  async create(@Body() createAddressDto: CreateAddressDto) {
    const addressId = await this.addressesService.create(createAddressDto);

    return { addressId };
  }

  @Get()
  findAll() {
    return this.addressesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.addressesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressesService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressesService.remove(+id);
  }
}
