import { Component, inject, NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  ngOnInit(): void {
  }
  authService = inject(AuthService);
  login(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    if (email == '') {
      alert('Please enter email');
      return;
    }

    if (password == '') {
      alert('Please enter password');
      return;
    }

    if (form.valid) {
      this.authService.SignIn(email, password)
    }
    console.log('Logged in:');

    form.reset();
  }
}
