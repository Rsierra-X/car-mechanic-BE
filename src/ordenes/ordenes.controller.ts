import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import {OrderService} from "./ordenes.service";
import {CreateOrderDTO, UpdateOrderDTO} from "./dto/orden.dto";
import {Order} from "./entities/orden.entity";

@Controller('orders')
//@UseGuards(JwtAuthGuard)  // Descomenta esto para proteger la ruta
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post()
    async create(@Body() orderDTO: CreateOrderDTO): Promise<Order> {
        return this.orderService.create(orderDTO);
    }

    @Get()
    async findAll(): Promise<Order[]> {
        return this.orderService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Order> {
        return this.orderService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() orderDTO: UpdateOrderDTO,
    ): Promise<Order> {
        return this.orderService.update(id, orderDTO);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.orderService.remove(id);
    }
}
