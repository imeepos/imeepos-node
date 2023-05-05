
import { Request } from 'express';
import { v1 } from './decorators'
import { getSourceTableConfig } from './models/sourceTable.model';
import { connection } from 'mongoose'
export class SourceController {

    @v1.get({
        path: 'getSourceTableConfig'
    })
    async _getSourceTableConfig(req: Request) {
        const query: any = req.query;
        const { source } = query;
        if (!source) {
            throw new Error(`query.source不能为空`)
        }
        const config = await getSourceTableConfig(source)
        return config;
    }

    @v1.post({
        path: 'search'
    })
    async _search(req: Request): Promise<{ list: any[], total: number }> {
        const { body } = req;
        const { page, psize, source } = body;
        const collection = connection.getClient().db().collection(source)
        const total = await collection.countDocuments()
        const list = await collection.find({}, {
            limit: psize,
            skip: (page - 1) * psize
        }).toArray()
        return { list, total }
    }
}