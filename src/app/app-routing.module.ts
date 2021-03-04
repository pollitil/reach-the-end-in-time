import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReachTheEndInTimeComponent } from './reach-the-end-in-time/reach-the-end-in-time.component';

const routes: Routes = [{ path:'', component: ReachTheEndInTimeComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
