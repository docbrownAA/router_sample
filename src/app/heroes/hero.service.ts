import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from '../message.service';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class HeroService {

	constructor(private messageService: MessageService,
		private http: HttpClient) { }

	baseUrl = environment.api + "heroes";

	getHeroes(): Observable<Hero[]> {
		// TODO: send the message _after_ fetching the heroes
		this.messageService.add('HeroService: fetched heroes');
		return this.http.get<Hero[]>(this.baseUrl);

	}

	getHero(id: number | string): Observable<Hero> {
		console.log("id:" + id);
		return this.http.get<Hero>(this.baseUrl + "/" + id);

	}

	modifyHero(hero: Hero, id: number): Observable<Hero> {
		return this.http.put<Hero>(this.baseUrl + "/" + id, hero);
	}

	createHero(hero): Observable<Hero>{
		return this.http.post<Hero>(this.baseUrl,hero);
	}
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/