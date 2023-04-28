import { v1, staticRoot } from './decorators'
export class AdminWelcome {
    @v1.html(staticRoot, 'welcome.html', {})
    welcome!: string;
}