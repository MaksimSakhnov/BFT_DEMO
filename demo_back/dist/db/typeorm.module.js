"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const process = require("process");
require('dotenv').config();
let TypeOrmModule = class TypeOrmModule {
};
exports.TypeOrmModule = TypeOrmModule;
exports.TypeOrmModule = TypeOrmModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'db',
                port: Number(process.env.POSTGRES_PORT),
                username: String(process.env.POSTGRES_USERNAME),
                password: String(process.env.POSTGRES_PASSWORD),
                database: String(process.env.POSTGRES_DATABASE),
                entities: ['dist/modules/**/*.entity.js'],
                synchronize: true,
                autoLoadEntities: true,
            }),
        ],
    })
], TypeOrmModule);
//# sourceMappingURL=typeorm.module.js.map