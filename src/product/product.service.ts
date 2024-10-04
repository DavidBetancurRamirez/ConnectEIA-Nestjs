import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { UserActiveInterface } from '../common/interfaces/user.interface';
import { UserService } from '../user/user.service';
import { ProductResponse } from './dto/product-response.dto';
import { DeleteProductDto } from './dto/delete-product.dto';
import { Role } from 'src/common/enums/rol.enum';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly userService: UserService
  ) {}

  async create(userActive: UserActiveInterface, createProductDto: CreateProductDto): Promise<ProductResponse> {
    const created_by = await this.userService.profile(userActive.email);
    const data = {
      ...createProductDto,
      new: createProductDto.new ?? false,
      negotiable: createProductDto.negotiable ?? false,
      created_by,
    }
    const productSaved = await this.productRepository.save(data);
    return this.toProductResponse(productSaved);
  }

  async findAll(): Promise<ProductResponse[]> {
    return await this.productRepository.find({
      order: {
        id: 'ASC'
      }
    });
  }

  async findAllByUser(userActive: UserActiveInterface): Promise<ProductResponse[]> {
    const user = await this.userService.profile(userActive.email);

    return await this.productRepository.find({
      where: { created_by: { id: user.id } },
      order: {
        id: 'ASC'
      }
    });
  }

  async findOne(id: number): Promise<ProductResponse> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new BadRequestException("Product not found")
    }
    return this.toProductResponse(product);
  }

  async findOneSecure(idProduct: number, userEmail: string): Promise<ProductResponse> {
    const user = await this.userService.profile(userEmail);
    const product = await this.findOne(idProduct);

    const isAdmin = user.roles.includes(Role.ADMIN);
    const isOwner = product.created_by.id === user.id;

    if (!isAdmin && !isOwner) {
      throw new UnauthorizedException("You are not authorized to access this product.");
    }
    
    return product;
  }

  async update(id: number, userActive: UserActiveInterface, updateProductDto: UpdateProductDto): Promise<ProductResponse> {
    const product = await this.findOneSecure(id, userActive.email);
    updateProductDto["images"] = [...product.images, ...updateProductDto.images]
    await this.productRepository.update(id, updateProductDto);
    return await this.findOne(id);
  }

  async remove(id: number, userActive: UserActiveInterface): Promise<DeleteProductDto> {
    await this.findOneSecure(id, userActive.email);
    await this.productRepository.softDelete({ id });
    return { message: 'Product successfully deleted' };
  }

  private toProductResponse(product: Product): ProductResponse {
    delete product["deletedAt"];
    return product;
  }
}
