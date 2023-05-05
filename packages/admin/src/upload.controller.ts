import { useS3 } from "@imeepos/core";
import { v1 } from "./decorators";
import { Request } from "express";


export class UploadController {

    @v1.get({ path: 'searchBucketsByKeyword' })
    async _searchBucketsByKeyword(req: Request) {
        const keyword = req.query.keyword;
        const client = useS3()
        const { Buckets } = await client.listBuckets({})
        if (Buckets) {
            return Buckets.map(b => ({
                value: b.Name,
                label: b.Name
            }))
        }
        return [];
    }

    @v1.get({ path: 'searchFileExtByKeyword' })
    async _searchFileExtByKeyword() {
        return [{ label: 'JPG', value: '.jpg' }, { label: 'PNG', value: '.png' }, { label: 'SVG', value: '.svg' }]
    }

}