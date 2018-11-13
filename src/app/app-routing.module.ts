import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from './page/heroes/heroes.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { HeroDetailComponent } from './page/hero-detail/hero-detail.component';
import { CalculationComponent } from './page/calculation/calculation.component';
import { OfficialComponent } from './page/official/official.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  {
    path: 'calc', component: CalculationComponent, children: [
      // { path: '', component: OfficialComponent },
      { path: 'official', component: OfficialComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
