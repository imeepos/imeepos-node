export class Account {
    uniacid: number = 0;
    /**
     * 创建账户
     */
    static async create(): Promise<Account> { 
        throw new Error(`Account.create not implement`)
    }
}