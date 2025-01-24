import { Injectable } from '@angular/core';
import {
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js'
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  async signUp(email: string, password: string, full_name: string) {
    try {
      // 1. Create auth user
      const { data: authData, error: authError } = await this.supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: full_name  // Store name in auth metadata
          },
          emailRedirectTo: 'http://localhost:4200'
        }
      });

      console.log(authData);

      if (authError) throw authError;

      // 2. If auth signup successful, create profile in custom table
      if (authData.user) {
        const { data: profileData, error: profileError } = await this.supabase
          .from('user_table')
          .insert([
            {
              auth_user_id: authData.user.id,
              email: email.toLowerCase(), // Convert email to lowercase
              name: full_name
            }
          ])

        if (profileError) throw profileError;

        return {
          success: true,
          message: 'Please check your email for verification link',
          user: {
            ...authData.user,
            profile: profileData
          }
        };
      }

      return { success: false, message: 'Signup failed' };

    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }


  // Login
  async login(email: string, password: string) {
    try {
      // First, authenticate using Supabase Auth
      const { data: authData, error: authError } = await this.supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw authError;

      // If auth successful, get user's data from your custom table
      if (authData.user) {
        const { data: userData, error: userError } = await this.supabase
          .from('user_table')  // your custom users table
          .select('*')    // select the fields you need
          .eq('auth_user_id', authData.user.id);  // match with auth.users id

        if (userError) throw userError;

        return {
          success: true,
          user: {
            ...authData.user,
            profile: userData  // custom user data
          }
        };
      }

      return { success: false, message: 'Authentication failed' };

    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Invalid credentials' };
    }

  }

  async Login() {
    try {
      const { data, error } = await this.supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo:
            'https://wwhecejcawnctpdrmtvq.supabase.co/auth/v1/callback', // function to get your URL
        },
      });

      if (data) {
        console.log(data);
        return { success: true, userData: data };
      }

      if (error) {
        throw error;
      }

      return { success: false };

    } catch (error) {
      console.log('Error:', error);
      return { success: false };
    }
    }

}
