import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { AgendamentoComponent } from './pages/agendamento/agendamento.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { UserComponent } from './pages/user/user.component';
import { AuthGuard } from './shared/auth.guard';
import { RoleGuardGuard } from './shared/role.guard.guard';

const routes: Routes = [
	{ path: "home", pathMatch: "full", redirectTo: "" },
	{ path: "", component: HomeComponent },
	{ path: "login", component: LoginComponent },
	{ path: "about", component: AboutComponent },
	{ path: "cadastro", component: CadastroComponent },
	{ path: "user", component: UserComponent, canActivate: [AuthGuard] },
	{ path: "agenda", component: AgendamentoComponent, canActivate: [AuthGuard] },
	{ path: "medico", component: MedicoComponent, canActivate: [AuthGuard, RoleGuardGuard] }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
