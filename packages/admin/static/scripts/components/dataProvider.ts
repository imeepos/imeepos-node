export type CrudSort = {
    field: string;
    order: "asc" | "desc";
};
export type CrudSorting = CrudSort[];
export type CrudOperators =
    | "eq"
    | "ne"
    | "lt"
    | "gt"
    | "lte"
    | "gte"
    | "in"
    | "nin"
    | "contains"
    | "ncontains"
    | "containss"
    | "ncontainss"
    | "between"
    | "nbetween"
    | "null"
    | "nnull"
    | "startswith"
    | "nstartswith"
    | "startswiths"
    | "nstartswiths"
    | "endswith"
    | "nendswith"
    | "endswiths"
    | "nendswiths"
    | "or"
    | "and";
export type ConditionalFilter = {
    key?: string;
    operator: Extract<CrudOperators, "or" | "and">;
    value: (LogicalFilter | ConditionalFilter)[];
};
export type LogicalFilter = {
    field: string;
    operator: Exclude<CrudOperators, "or" | "and">;
    value: any;
};
export type CrudFilter = LogicalFilter | ConditionalFilter;

export abstract class DataProvider {
    abstract getApiUrl(): string;
    abstract custom(params: {
        url: string;
        method: string;
        sorters?: CrudSorting;
        filters?: CrudFilter[];
        headers?: {};
        meta?: {}
    }): Promise<void>;
}
export interface QueryMeta {
    [index: string]: unknown
}