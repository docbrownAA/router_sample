import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
	selector: 'app-hero-detail',
	templateUrl: './hero-detail.component.html',
	styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

	hero: Hero;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private service: HeroService) { }

	ngOnInit() {

		let selectedId = this.route.snapshot.paramMap.get('id');
		if (selectedId) {

			this.service.getHero(selectedId).subscribe(data => {
				this.hero = data;
			});
		} else {
			this.hero = new Hero();
		}



	}

	goToHeroes(hero: Hero) {
		let heroId = hero ? hero.id : null;
		this.router.navigate(['/superheroes', { id: heroId }]);
	}

	save() {
		this.service.createHero(this.hero).subscribe(data => {
			this.hero = data;
		});
	}
}




/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/