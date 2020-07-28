import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit, OnChanges {
  @Input() x = 0;
  @Input() y = 0;
  @Output() remove = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (screen.width < this.x + 250) {
      // this.x = this.x - (screen.width - (this.x));
      this.x = screen.width - 300;
    }
    const box = document.querySelector('.context-menu') as HTMLElement;
    console.log(screen.height);
    console.log(this.y);
    if (screen.height < this.y + 200) {
      console.log(screen.height);
      this.y = screen.height - 230;
      // this.y = this.y - (screen.height - (this.y));
    }
  }
  onClick(menu: string) {
    if (menu === 'remove') {
      this.remove.emit(menu);
    }
  }

}
