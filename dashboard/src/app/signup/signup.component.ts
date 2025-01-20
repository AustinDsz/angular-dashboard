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
    full_name: '',
    email: '',
    password: '',
  };

  constructor(private supabaseService: SupabaseService, private router: Router) {}

  onSubmit() {
    this.supabaseService.submitSignupForm(this.formData)
      .then((response) => {
        // Handle success (e.g., show a success message)
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        // Handle error (e.g., show an error message)
      });
  }

}
