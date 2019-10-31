import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDasboardComponent } from './admin-dasboard/admin-dasboard.component';
import { AdminComponent } from './admin/admin.component';
import { ManageCrisisesComponent } from './manage-crisises/manage-crisises.component';
import { ManageHeroesComponent } from './manage-heroes/manage-heroes.component';


@NgModule({
	declarations: [
		AdminComponent,
		AdminDasboardComponent,
		ManageCrisisesComponent,
		ManageHeroesComponent],
	imports: [
		CommonModule,
		AdminRoutingModule
	]
})
export class AdminModule { }
