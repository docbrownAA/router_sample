import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectivePreloadingStrategyService } from '../../selective-preloading-strategy.service';

@Component({
  selector: 'app-admin-dasboard',
  templateUrl: './admin-dasboard.component.html',
  styleUrls: ['./admin-dasboard.component.css']
})
export class AdminDasboardComponent implements OnInit {
	sessionId: Observable<string>;
	token: Observable<string>;
  modules: string[] = [];

  constructor(private route: ActivatedRoute,
    private preloadStrategy: SelectivePreloadingStrategyService) {
    this.modules = this.preloadStrategy.preloadedModules;
  }

  ngOnInit() {
    this.sessionId = this.route
      .queryParamMap
      .pipe(map(params => params.get('session_id') || 'None'));
      

    this.token = this.route
      .fragment
      .pipe(map(fragment => fragment || 'None'));
  }

}
