import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

  link="/"

  constructor(
      private router: Router,) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
