import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { IColumn } from 'src/app/model/column';
import { ITask } from 'src/app/model/task';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-column-list',
  templateUrl: './column-list.component.html',
  styleUrls: ['./column-list.component.scss']
})
export class ColumnListComponent implements OnInit {
  @Input() column: IColumn;
  @Input() taskList: Array<ITask> = [];
  @Output() removeTask = new EventEmitter<number>();
  selectedTask: ITask;
  isContextMenuShow = false;
  contextmenuX = 0;
  contextmenuY = 0;
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.selectedTask = {
      id: null,
      columnId: null,
      taskDesc: '',
      ticketNumber: ''
    };
  }


  onRightClick(event, task: ITask) {
    // if ( this.selectedTask.id && task.id === this.selectedTask.id) {
    //   // this.isContextMenuShow = false;
    // }
  
    const previousMenu = document.getElementsByClassName('context-menu');
    if (previousMenu.length > 0) {
      previousMenu[0].remove();
      this.selectedTask = {
        id: null,
        columnId: null,
        taskDesc: '0',
        ticketNumber: ''
      };
    }
    setTimeout(() => {
      this.selectedTask = task;
    }, 0);
    event.preventDefault();
    this.contextmenuX = event.clientX;
    this.contextmenuY = event.clientY;
    this.isContextMenuShow = true;
  }

  clickOutside(event) {
    this.isContextMenuShow = false;
    this.selectedTask = null;
  }

  onMenuChange(menu: string) {
    if (menu === 'remove') {
      this.removeTask.emit(this.selectedTask.id);

    }
  }

}
