import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Crisis } from '../crisis';
import { CrisisService } from '../crisis.service';

@Component({
  selector: 'app-crisis-list',
  templateUrl: './crisis-list.component.html',
  styleUrls: ['./crisis-list.component.css']
})
export class CrisisListComponent implements OnInit {

  selectedCrisis: Crisis;
  selectedId: number;

  crisises$: Observable<Crisis[]>;

  constructor(private crisisService: CrisisService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.crisises$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = +params.get('id');
        return this.crisisService.getCrisises();
      })
      )
  }

  onSelect(crisis: Crisis): void {
    this.selectedCrisis = crisis;
    this.selectedId = this.selectedCrisis.id
  }

}
