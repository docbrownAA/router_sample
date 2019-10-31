import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Crisis } from './crisis';
import { CRISES } from './mock-crisis';
import { MessageService } from '../message.service';

@Injectable({
	providedIn: 'root',
})
export class CrisisService {

	baseUrl = environment.api+"crisises"
	constructor(private messageService: MessageService, private http: HttpClient) { }

	getCrisises(): Observable<Crisis[]> {
		// TODO: send the message _after_ fetching the heroes
		this.messageService.add('CrisisService: fetched crisises');
		return this.http.get<Crisis[]>(this.baseUrl);
	}

	getCrisis(id: number | string): Observable<Crisis> {
		console.log("id:"+id);
		return this.http.get<Crisis>(this.baseUrl+"/"+id);
	}

	modifyCrisis(crisis: Crisis, id:number): Observable<Crisis>{
		return this.http.put<Crisis>(this.baseUrl+"/"+id,crisis);
	}
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/