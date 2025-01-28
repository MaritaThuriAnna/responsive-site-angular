import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class ConfigService {
    private config: any;
    private URL = 'menu-config.json';
    
    async loadConfig(): Promise<any> {
        console.log("1")
        try {
            console.log("2")
            const resp = await fetch(this.URL);
            console.log("My response: ", resp);
            return await resp.json();
        }
        catch (error) {
            console.error('Failed to load configuration:', error);
            throw error;
        };
    }

    getMenu() {
        console.log("3")
        return this.config?.menu?.filter((item: any) => item.enabled) || [];
      }
}