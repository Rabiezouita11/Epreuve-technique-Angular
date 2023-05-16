import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { ComponentComponent } from './admin/component/component.component';
import { PageNotfoundComponent } from './page-notfound/page-notfound.component';
import { LoginComponent } from './Auth/login/login.component';
import { AuthGuard } from './Auth/auth.guard';
import { RegisterComponent } from './Auth/register/register.component';

const routes: Routes = [
  { path: 'client', component: ClientComponent},

  {
    path: '',
    component: ComponentComponent,
    canActivate: [AuthGuard], // Add the AuthGuard here
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  
  { path: '**', component: PageNotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
