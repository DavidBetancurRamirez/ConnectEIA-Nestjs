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
import { ProductResponse } from './dto/product-response.dto';
import { DeleteProductDto } from './dto/delete-product.dto';

@ApiTags('product')
@ResponsesSecurity()
@Auth([Role.USER])
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Find Products' })
  findAll(): Promise<ProductResponse[]> {
    return this.productService.findAll();
  }

  @Get('my-products')
  @ApiOperation({ summary: 'Find My Products' })
  findMyProducts(@ActiveUser() userActive: UserActiveInterface): Promise<ProductResponse[]> {
    return this.productService.findAllByUser(userActive);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find Product' })
  findOne(@Param('id') id: number): Promise<ProductResponse> {
    return this.productService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create Product' })
  create(
    @ActiveUser() userActive: UserActiveInterface, 
    @Body() createProductDto: CreateProductDto
  ): Promise<ProductResponse> {
    return this.productService.create(userActive, createProductDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit Product' })
  update(
    @Param('id') id: number, 
    @ActiveUser() userActive: UserActiveInterface, 
    @Body() updateProductDto: UpdateProductDto
  ): Promise<ProductResponse> {
    return this.productService.update(id, userActive, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Product' })
  remove(
    @Param('id') id: number,
    @ActiveUser() userActive: UserActiveInterface, 
  ): Promise<DeleteProductDto> {
    return this.productService.remove(id, userActive);
  }
}
