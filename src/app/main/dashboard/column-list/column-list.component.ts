import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectorRef, NgZone } from '@angular/core';
import { IColumn } from 'src/app/model/column';
import { ITask } from 'src/app/model/task';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-column-list',
  templateUrl: './column-list.component.html',
  styleUrls: ['./column-list.component.scss']
})
export class ColumnListComponent implements OnInit {
  // @Input() column: IColumn;
  // @Input() taskList: Array<ITask> = [];
  public columnList: Array<IColumn> = [];
  public columnName: Array<string> = [];
  public taskList: Array<ITask> = [];
  @Output() removeTask = new EventEmitter<number>();
  selectedTask: ITask;
  isContextMenuShow = false;
  contextmenuX = 0;
  contextmenuY = 0;
  constructor(private cdr: ChangeDetectorRef, private zone: NgZone) { }

  ngOnInit(): void {
    this.selectedTask = {
      id: null,
      columnId: null,
      taskDesc: '',
      ticketNumber: ''
    };
    this.columnList = [
      { id: 1, name: 'toDo', value: 'TO DO' },
      { id: 2, name: 'inProgress', value: 'IN-PROGRESS' },
      { id: 3, name: 'review', value: 'REVIEW' },
      { id: 4, name: 'complete', value: 'COMPLETE' }
    ];

    this.columnList.filter(column => {
      this.columnName.push(column.name);
    })
    this.taskList = [
      { id: 1, columnId: 1, ticketNumber: 'TSK-001', taskDesc: 'This is a description of a item on the board one.' },
      { id: 2, columnId: 2, ticketNumber: 'TSK-002', taskDesc: 'This is a description of a item on the board two.' },
      { id: 3, columnId: 3, ticketNumber: 'TSK-003', taskDesc: 'This is a description of a item on the board three.' },
      { id: 4, columnId: 4, ticketNumber: 'TSK-004', taskDesc: 'This is a description of a item on the board four.' },
      { id: 5, columnId: 1, ticketNumber: 'TSK-005', taskDesc: 'This is a description of a item on the board five.' },
      { id: 6, columnId: 1, ticketNumber: 'TSK-006', taskDesc: 'This is a description of a item on the board five.' },
      { id: 7, columnId: 1, ticketNumber: 'TSK-007', taskDesc: 'This is a description of a item on the board five.' },
    ];
    console.log(this.taskList);
  }

  getList(index){
    const columnNameList = this.columnName.filter((column,i) => i !== index);
    // this.columnList.filter(column => {
    //   if(column.id !== columnName){
    //     columnNameList.push(column.id);
    //   }
    // })
    // console.log(columnNameList);
    return columnNameList;
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
    // setTimeout(() => {
      this.selectedTask = task;
    // }, 0);
    event.preventDefault();
    this.contextmenuX = event.clientX;
    this.contextmenuY = event.clientY;
    this.isContextMenuShow = true;
    
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event)
    // const previousObject = this.taskList[event.previousIndex];
    // this.taskList[event.previousIndex] = this.taskList[event.currentIndex];
    // this.taskList[event.currentIndex] = previousObject;
    // console.log(this.taskList);
    // this.zone.run(() => {
    //   this.taskList = [...this.taskList];
    // })
    console.log(event.previousContainer);
    console.log(event.container);
    console.log(event.previousContainer === event.container);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      }
      // this.cdr.detectChanges();
    console.log(this.taskList);

    // this.cdr.markForCheck();
  }

  clickOutside(event) {
    this.isContextMenuShow = false;
    this.selectedTask = null;
  }

  onMenuChange(menu: string) {
    if (menu === 'remove') {
      // this.removeTask.emit(this.selectedTask.id);
      const taskIndex  = this.taskList.findIndex(task => task.id === this.selectedTask.id);
      this.taskList.splice(taskIndex , 1);

    }
  }

}
