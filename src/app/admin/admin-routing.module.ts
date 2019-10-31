
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { ManageCrisisesComponent } from './manage-crisises/manage-crisises.component';
import { ManageHeroesComponent } from './manage-heroes/manage-heroes.component';
import { AdminDasboardComponent } from './admin-dasboard/admin-dasboard.component';


const adminRoutes: Routes = [
	{
		path: '',
		component: AdminComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: '',
				canActivateChild: [AuthGuard],
				children: [
					{ path: 'crisis', component: ManageCrisisesComponent },
					{ path: 'heroes', component: ManageHeroesComponent },
					{ path: '', component: AdminDasboardComponent }
				]
			}
		],
	}
];

@NgModule({
	imports: [RouterModule.forChild(adminRoutes)],
	exports: [RouterModule]
})
export class AdminRoutingModule { }
