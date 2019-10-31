
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';
import { AuthGuard } from './auth/auth.guard';
import { ComposeMessageComponent } from './compose-message/compose-message.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const appRoutes: Routes = [

  { path: 'compose', component: ComposeMessageComponent, outlet: 'popup' },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'crisis-center',
    loadChildren: () => import('./crisis-center/crisis-center.module').then(mod => mod.CrisisCenterModule),
    data: { preload: true }
  },
  { path: '', redirectTo: '/superheroes', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true,
        preloadingStrategy: SelectivePreloadingStrategyService
      })
  ],
  exports: [
    RouterModule
  ],
  providers: [
    SelectivePreloadingStrategyService
  ]
})
export class AppRoutingModule { }
