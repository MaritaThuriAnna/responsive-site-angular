import { Component, inject, OnInit } from '@angular/core';
import { ConfigService } from '../../config.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgIf],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{
  enabled = false;
  sticky = false;
  private configService = inject(ConfigService);

  async ngOnInit() {
    try{
      const config = await this.configService.loadConfig();
      console.log('Config loaded:', config);
      this.enabled = config.footer.enabled;
      this.sticky = config.footer.sticky;
    }catch (error) {
      console.error('Error loading footer configuration:', error);
    }
  }
}
