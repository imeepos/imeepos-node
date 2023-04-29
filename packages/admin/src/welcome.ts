import { v1, staticRoot } from './decorators'
export class AdminWelcome {
    @v1.html(staticRoot, 'welcome.html')
    welcome!: string;

    @v1.html(staticRoot, 'login.html')
    login!: string;

    @v1.html(staticRoot, 'index.html')
    index!: string;
}
