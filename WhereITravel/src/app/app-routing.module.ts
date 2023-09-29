
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './Pages/homepage/homepage.component';
import { ResultComponent } from './Pages/result/result.component';
import { ReviewsComponent } from './Pages/reviews/reviews.component';

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent},
  { path: '', pathMatch:'full' ,redirectTo: 'homepage'},
  { path: 'results', component: ResultComponent},
  {
    path:  'reviews', component: ReviewsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
