"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// client.ts
// import { PrismaClient } from '@prisma/clie
const prisma_1 = require("../../src/generated/prisma");
const client = new prisma_1.PrismaClient();
exports.default = client;
