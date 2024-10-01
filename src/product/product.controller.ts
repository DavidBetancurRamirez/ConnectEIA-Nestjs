import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponsesSecurity } from '../common/decorators/responses-security.decorator';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/rol.enum';
import { UserActiveInterface } from '../common/interfaces/user.interface';
import { ActiveUser } from '../common/decorators/active-user.decorator';

@ApiTags('product')
@ResponsesSecurity()
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Find Products' })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find Product' })
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create Product' })
  @Auth([Role.USER])
  create(@ActiveUser() userActive: UserActiveInterface, @Body() createProductDto: CreateProductDto) {
    return this.productService.create(userActive, createProductDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit Product' })
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Product' })
  remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }
}
