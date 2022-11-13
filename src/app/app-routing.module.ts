import { AgendamentoComponent } from './pages/agendamento/agendamento.component';
import { UserComponent } from './pages/user/user.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { AboutComponent } from './pages/about/about.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  // { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "about", component: AboutComponent },
  { path: "user", component: UserComponent },
  { path: "agenda", component: AgendamentoComponent },
  { path: "cadastro", component: CadastroComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
