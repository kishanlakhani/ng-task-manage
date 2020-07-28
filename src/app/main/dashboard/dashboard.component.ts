import { Component, OnInit } from '@angular/core';
import { IColumn } from 'src/app/model/column';
import { ITask } from 'src/app/model/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public columnList: Array<IColumn> = [];
  public taskList: Array<ITask> = [];
  constructor() { }

  ngOnInit(): void {
    this.columnList = [
      { id: 1, name: 'TO DO' },
      { id: 2, name: 'IN-PROGRESS' },
      { id: 3, name: 'REVIEW' },
      { id: 4, name: 'COMPLETE' }
    ];

    this.taskList = [
      { id: 1, columnId: 1, ticketNumber: 'TSK-001', taskDesc: 'This is a description of a item on the board one.' },
      { id: 2, columnId: 2, ticketNumber: 'TSK-002', taskDesc: 'This is a description of a item on the board two.' },
      { id: 3, columnId: 3, ticketNumber: 'TSK-003', taskDesc: 'This is a description of a item on the board three.' },
      { id: 4, columnId: 4, ticketNumber: 'TSK-004', taskDesc: 'This is a description of a item on the board four.' },
      { id: 5, columnId: 1, ticketNumber: 'TSK-005', taskDesc: 'This is a description of a item on the board five.' },
      { id: 6, columnId: 1, ticketNumber: 'TSK-005', taskDesc: 'This is a description of a item on the board five.' },
      { id: 7, columnId: 1, ticketNumber: 'TSK-005', taskDesc: 'This is a description of a item on the board five.' },
    ];
  }

  public onFilterTask(column: IColumn): Array<ITask> {
    return this.taskList.filter(task => task.columnId === column.id);
  }

  public removeTask(id: number): void {
    const taskIndex  = this.taskList.findIndex(task => task.id === id);
    this.taskList.splice(taskIndex , 1);
  }

}
