import { Component } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,

  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  formData = {
    email: '',
    password: '',
    userData: {
      full_name:''
    }
  };

  message: string = '';
  messageType: 'success' | 'error' = 'success';

  constructor(private supabaseService: SupabaseService, private router: Router) {}

  async onSubmit() {
    try {
      const result = await this.supabaseService.signUp(
        this.formData.email,
        this.formData.password,
        this.formData.userData.full_name
      );

      if (result.success) {
        this.message = result.message;
        this.messageType = 'success';

        // Optionally redirect to login after a delay
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      } else {
        this.message = result.message;
        this.messageType = 'error';
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      this.message = error.message || 'Signup failed';
      this.messageType = 'error';
    }
  }

}
