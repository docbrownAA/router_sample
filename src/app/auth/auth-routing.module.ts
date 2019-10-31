import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';



const authRoutes: Routes = [
  { path: 'login', component: LoginComponent },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(
      authRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
