import { get } from '../util'
export function searchBucketsByKeyword(keyword?: string) {
    return get('/@imeepos/admin/v1/searchBucketsByKeyword', { keyword })
}
