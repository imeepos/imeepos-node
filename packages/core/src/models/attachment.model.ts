import { Model, Table, Column, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript'

@Table({})
export class AttachmentModel extends Model {
    @Column({
        type: 'number',
        autoIncrement: true,
        comment: '附件编号',
    })
    id!: number;

    @Column({
        type: 'string',
        comment: '附件链接'
    })
    url!: string;

    @CreatedAt
    create_at!: Date;

    @UpdatedAt
    update_at!: Date;

    @DeletedAt
    delete_at!: Date;
}