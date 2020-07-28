import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';


import {DragDropModule} from '@angular/cdk/drag-drop'; 
import { RouterModule, Routes } from '@angular/router';
import { ColumnListComponent } from './column-list/column-list.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { DirectiveModule } from 'src/app/directive/directive.module';

const route: Routes = [
  { path: '', component: DashboardComponent }
];

@NgModule({
  declarations: [DashboardComponent, ColumnListComponent, ContextMenuComponent],
  imports: [
    CommonModule,
    DragDropModule,
    DirectiveModule,
    RouterModule.forChild(route)
  ]
})
export class DashboardModule { }
