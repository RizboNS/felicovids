import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatistikaComponent } from './pages/statistika/statistika.component';
import { VestiComponent } from './pages/vesti/vesti.component';

const routes: Routes = [
  { path: 'vesti', component: VestiComponent },
  { path: 'statistika', component: StatistikaComponent },
  { path: '', redirectTo: '/vesti', pathMatch: 'full' },
  { path: '**', component: VestiComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
