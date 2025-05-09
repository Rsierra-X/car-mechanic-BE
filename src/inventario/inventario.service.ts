import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Like, Repository} from 'typeorm';
import { Producto } from './entities/producto.entity';
import * as ExcelJS from 'exceljs';
const PDFDocument = require('pdfkit');
import { Response } from 'express';

@Injectable()
export class InventarioService {
    constructor(
        @InjectRepository(Producto)
        private readonly productoRepo: Repository<Producto>,
    ) { }

    async findAll(): Promise<Producto[]> {
        return this.productoRepo.find();
    }

    async findOne(id: number): Promise<Producto> {
        const producto = await this.productoRepo.findOne({ where: { ProductoID: id } });
        if (!producto) throw new NotFoundException(`Producto con ID ${id} no encontrado`);
        return producto;
    }

    async create(data: Partial<Producto>): Promise<Producto> {
        const nuevo = this.productoRepo.create(data);
        return this.productoRepo.save(nuevo);
    }

    async update(id: number, data: Partial<Producto>): Promise<Producto> {
        await this.productoRepo.update(id, data);
        return this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        const result = await this.productoRepo.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Producto con ID ${id} no encontrado`);
        }
    }

    async search(query: string): Promise<Producto[]> {
        return this.productoRepo.find({
            where: { Nombre: Like(`%${query}%`) },
        });
    }

    async exportarInventario(formato: "excel" | "pdf", res: any): Promise<void> {
        const productos = await this.findAll(); // Obtener los productos aquí

        if (formato === 'excel') {
            const workbook = new ExcelJS.Workbook();
            const sheet = workbook.addWorksheet('Inventario');

            sheet.columns = [
                { header: 'ID', key: 'ProductoID', width: 10 },
                { header: 'Nombre', key: 'Nombre', width: 30 },
                { header: 'Descripción', key: 'Descripcion', width: 50 },
                { header: 'Cantidad', key: 'Cantidad', width: 15 },
                { header: 'Precio Unitario', key: 'PrecioUnitario', width: 20 },
                { header: 'Fecha Ingreso', key: 'FechaIngreso', width: 20 },
            ];

            productos.forEach(producto => {
                sheet.addRow({
                    ProductoID: producto.ProductoID,
                    Nombre: producto.Nombre,
                    Descripcion: producto.Descripcion,
                    Cantidad: producto.Cantidad,
                    PrecioUnitario: producto.PrecioUnitario,
                    FechaIngreso: producto.FechaIngreso,
                });
            });

            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=inventario.xlsx');

            await workbook.xlsx.write(res);
            res.end();
        } else if (formato === 'pdf') {
            const doc = new PDFDocument({ size: 'A4', margin: 50 });
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=inventario.pdf');
            doc.pipe(res);

            doc.fontSize(16).text('Inventario de Productos', { align: 'center' }).moveDown();

            productos.forEach(producto => {
                doc.fontSize(12).text(`ID: ${producto.ProductoID}`);
                doc.text(`Nombre: ${producto.Nombre}`);
                doc.text(`Descripción: ${producto.Descripcion}`);
                doc.text(`Cantidad: ${producto.Cantidad}`);
                doc.text(`Precio Unitario: Q${producto.PrecioUnitario}`);
                doc.text(`Fecha Ingreso: ${producto.FechaIngreso}`);
                doc.moveDown();
            });

            doc.end();
        }
    }
}