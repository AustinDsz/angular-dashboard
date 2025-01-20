import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: "",
    title: "HomePage",
    component: MainComponent
  },
  {
    path: 'login',
    title: "Login",
    component: LoginComponent
  },
  {
    path:'signup',
    title:'Signup',
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
