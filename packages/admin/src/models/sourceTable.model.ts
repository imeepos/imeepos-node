import { Schema, model } from 'mongoose'
export interface SourceTableColumn {
    dataIndex: string;
}
export interface SourceTable {
    source: string;
    size: string;
    bordered: boolean;
    rowClassName: string;
    rowKey: string;
    showHeader: boolean;
    columns: Array<SourceTableColumn>;
    rights: { [key: string]: boolean };
}
const SourceTableSchema = new Schema({
    source: String,
    size: {
        type: String,
        enum: ['large', 'middle', 'small']
    },
    bordered: Boolean,
    rowClassName: String,
    rowKey: String,
    showHeader: Boolean
})
const SourceTableModel = model('config_source_table', SourceTableSchema)

export async function getSourceTableConfig(source: string): Promise<SourceTable> {
    const config = await SourceTableModel.findOne({ source })
    if (!!config) return config as any;
    await setSourceTableConfig(source, {})
    return getSourceTableConfig(source)
}

export async function setSourceTableConfig(source: string, config: Partial<SourceTable>) {
    const item = await SourceTableModel.findOne({ source })
    if (item) {
        await SourceTableModel.updateOne({ source }, config)
    } else {
        await new SourceTableModel({ size: 'middle', bordered: true, rowClassName: 'imeepos-table-row', rowKey: 'id', showHeader: false, source, ...config }).save()
    }
}
