import express, { Router } from 'express'
import { join } from 'path';

export function main(): Router {
    const app = Router()
    app.use(express.static(join(__dirname, '../static')))
    return app;
}
