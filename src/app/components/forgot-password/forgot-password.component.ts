import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  authService = inject(AuthService);

  forgotPassword(form: NgForm) {
    if (!form.valid) {
      alert('Please enter a valid email.');
      return;
    }

    const email = form.value.email;
    this.authService.ForgotPassword(email).then(() => {
      alert('Password reset email sent! Check your inbox.');
      form.reset();
    }).catch((error) => {
      alert(error.message);
    });
  }
}
