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

  async submitSignupForm(formData: any) {
    try {
      const { data, error } = await this.supabase
        .from('user_table')
        .insert([formData])
        .select();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }
}
