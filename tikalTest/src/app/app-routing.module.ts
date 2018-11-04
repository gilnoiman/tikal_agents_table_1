import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AgentsComponent} from './agents/agents.component';

const routes: Routes = [
  {
    path: '',
    component: AgentsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
