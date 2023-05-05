import { get } from '../util'
export function searchFileExtByKeyword(keyword?: string) {
    return get('/@imeepos/admin/v1/searchFileExtByKeyword', { keyword })
}
