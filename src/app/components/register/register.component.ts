import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router); 

  async register(form: NgForm) {
    console.log("Form Submitted:", form.value);

    const { email, password, username } = form.value;

    // Validation
    if (!email || !password || !username) {
      alert('All fields are required');
      return;
    }

    try {
      await this.authService.SignUp(email, password, username);
      alert('Registration successful!');
      this.router.navigate(['/login']); // Redirect to login
    } catch (error: any) {
      alert(error.message);
    }

    form.reset();
  }
}
