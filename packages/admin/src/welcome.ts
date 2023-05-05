import { v1, staticRoot } from './decorators'
import { getMenuItems } from './models/menu.model';
export class AdminWelcome {
    @v1.html(staticRoot, 'welcome.html')
    welcome!: string;

    @v1.html(staticRoot, 'login.html')
    login!: string;

    @v1.html(staticRoot, 'register.html')
    register!: string;

    @v1.html(staticRoot, 'index.html')
    index!: string;

    @v1.html(staticRoot, 'demo.html')
    demo!: string;

    @v1.html(staticRoot, 'curd.html')
    curd!: string;

    @v1.html(staticRoot, 'settings.html')
    settings!: string;

    @v1.get({ path: 'getMenus' })
    getMenus() { 
        return getMenuItems()
    }
}
