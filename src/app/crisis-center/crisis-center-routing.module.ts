
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrisisCenterComponent } from './crisis-center/crisis-center.component';
import { CrisisCenterHomeComponent } from './crisis-center-home/crisis-center-home.component';
import { CrisisListComponent } from './crisises-list/crisis-list.component';
import { CrisisDetailComponent } from './crisis-detail/crisis-detail.component';
import { CrisisDetailResolverService } from './crisis-detail-resolver.service';

import { CanDeactivateGuard } from '../can-deactivate.guard';


const crisisesRoutes: Routes = [
	{
		path: '',
		component: CrisisCenterComponent,
		children: [
			{
				path: '',
				component: CrisisListComponent,
				children: [
					{
						path: ':id',
						component: CrisisDetailComponent,
						canDeactivate: [CanDeactivateGuard],
						resolve: {
							crisis: CrisisDetailResolverService
						}
					},
					{
						path: '',
						component: CrisisCenterHomeComponent
					}
				]
			}
		]
	}

];

@NgModule({
	imports: [RouterModule.forChild(crisisesRoutes)],
	exports: [RouterModule]
})
export class CrisisCenterRoutingModule { }
