import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { UserActiveInterface } from '../common/interfaces/user.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly userService: UserService
  ) {}

  async create(userActive: UserActiveInterface, createProductDto: CreateProductDto) {
    const created_by = await this.userService.findOneByEmail(userActive.email);
    const data = {
      ...createProductDto,
      created_by,
      last_update: Date()
    }
    const response = await this.productRepository.save(data);
    return response;
  }

  findAll() {
    return this.productRepository.find({
      order: {
        id: 'ASC'
      }
    });
  }

  findOne(id: number) {
    return this.productRepository.findOneBy({ id });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, updateProductDto);
  }

  remove(id: number) {
    return this.productRepository.softDelete({ id });
  }
}
