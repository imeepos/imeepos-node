import express, { Router } from 'express'
import { join } from 'path';
import { start } from './apis/start';
import { stop } from './apis/stop';
import { restart } from './apis/restart';
import { del } from './apis/del';
import { reload } from './apis/reload';
import { list } from './apis/list';
import { startup } from './apis/startup';

export default function (): Router {
    const router = Router()
    router.use(express.static(join(__dirname, '../static')))
    router.post('/start', start)
    router.post('/stop', stop)
    router.post('/restart', restart)
    router.post('/del', del)
    router.post('/reload', reload)
    router.post('/list', list)
    router.get('/list', list)
    router.post('/startup', startup)
    return router;
}