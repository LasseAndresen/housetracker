import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./pages/login/login-page.component";
import {AuthCallbackComponent} from "./components/auth-callback/auth-callback.component";
import {HomePageComponent} from "./pages/home/home-page.component";
import {NgModule} from "@angular/core";
import {authGuard} from "./guards/auth.guard";

export const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginPageComponent },
  { path: 'auth/callback', component: AuthCallbackComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
