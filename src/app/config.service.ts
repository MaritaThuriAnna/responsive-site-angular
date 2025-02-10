import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class ConfigService {
    private config: any;
    private URL = 'menu-config.json';

    async loadConfig(): Promise<any> {
        if (this.config) return this.config;

        try {
            const resp = await fetch(this.URL);
            this.config = await resp.json();
            return this.config;
        } catch (error) {
            console.error('Failed to load configuration:', error);
            throw error;
        }
    }

    getMenu() {
        // console.log("3")
        return this.config?.menu?.filter((item: any) => item.enabled) || [];
    }

    getSidebar() {
        if (!this.config || !this.config.sidebar || !this.config.sidebar.enabled) {
            return [];
        }

        return this.config.sidebar.items
            .filter((item: any) => item.enabled)
            .map((item: any) => ({
                ...item,
                subMenu: item.subMenu ? item.subMenu.filter((sub: any) => sub.enabled) : []
            }));
    }

}