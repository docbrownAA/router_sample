import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Crisis } from '../crisis';
import { CrisisService } from '../crisis.service';
import { DialogService } from '../../dialog.service';

@Component({
	selector: 'app-crisis-detail',
	templateUrl: './crisis-detail.component.html',
	styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {

	crisis: Crisis;
	editName: string;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private service: CrisisService,
		public dialogService: DialogService) { }

	ngOnInit() {
		this.route.data.subscribe((data: { crisis: Crisis }) => {
			console.log(data.crisis);
			this.crisis = data.crisis;
			this.editName = data.crisis.name;
		})

		/*this.route.paramMap.pipe(
			switchMap((params: ParamMap) =>
				this.service.getCrisis(params.get('id'))
			));*/

	}

	goToCrisises(crisis?: Crisis) {
		let crisisId = crisis ? crisis.id : null;
		this.router.navigate(['../', { id: crisisId }], { relativeTo: this.route });
	}

	cancel() {
		this.goToCrisises();
	}

	save() {
		this.crisis.name = this.editName;
		this.service.modifyCrisis(this.crisis, this.crisis.id).subscribe((data) => {
			this.crisis = data;
			this.goToCrisises();
		})
	}

	canDeactivate(): Observable<boolean> | boolean {
		if (!this.crisis || this.crisis.name === this.editName) {
			return true;
		}

		return this.dialogService.confirm('Discard changes?');
	}


}




/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/