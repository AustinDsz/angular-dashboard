import { Component } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: SupabaseService,
    private router: Router
  ) {}

  async onSubmit() {
    try {
      const result = await this.authService.login(this.email, this.password);

      if (result.success) {
        // Store user data if needed

        const { user } = result;

        localStorage.setItem('user', JSON.stringify(user));
        // Navigate to dashboard or home page
        this.router.navigate(['/']);
      } else {
        this.errorMessage = result.message || 'Invalid email or password';
      }
    } catch (error) {
      console.error('Login error:', error);
      this.errorMessage = 'An error occurred during login';
    }
  }


  async signInWithGoogle() {
    const result = await this.authService.Login()

    if(result?.success) {
        console.log(result.userData)
    } else {
        alert("Failed")
    }
  }

}
