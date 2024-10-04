import { OmitType } from "@nestjs/swagger";
import { Product } from "../entities/product.entity";

export class ProductResponse extends OmitType(Product, ['deletedAt'] as const) {}
