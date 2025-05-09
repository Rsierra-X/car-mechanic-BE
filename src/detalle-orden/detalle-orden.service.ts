import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {OrderDetail} from "./entities/orderDetail";
import {Repository} from "typeorm";
import {CreateOrderDetailDto, UpdateOrderDetailDto} from "./dto/order-detail.dto";

@Injectable()
export class DetalleOrdenService {
    constructor(
        @InjectRepository(OrderDetail)
        private readonly orderDetailRepository: Repository<OrderDetail>,
    ) {}

    async create(dto: CreateOrderDetailDto): Promise<OrderDetail> {
        const detail = this.orderDetailRepository.create(dto);
        return this.orderDetailRepository.save(detail);
    }

    async findAll(): Promise<OrderDetail[]> {
        return this.orderDetailRepository.find();
    }

    async findOne(id: number): Promise<OrderDetail> {
        const detail = await this.orderDetailRepository.findOne({ where: { id } });
        if (!detail) throw new NotFoundException('Detalle no encontrado');
        return detail;
    }

    async update(id: number, dto: UpdateOrderDetailDto): Promise<OrderDetail> {
        const detail = await this.findOne(id);
        const updated = this.orderDetailRepository.merge(detail, dto);
        return this.orderDetailRepository.save(updated);
    }

    async remove(id: number): Promise<void> {
        const detail = await this.findOne(id);
        await this.orderDetailRepository.remove(detail);
    }
}
