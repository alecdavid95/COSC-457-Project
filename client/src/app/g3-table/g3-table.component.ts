import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-g3-table',
  templateUrl: './g3-table.component.html',
  styleUrls: ['./g3-table.component.scss']
})
export class G3TableComponent implements OnInit {
  @Input() data;
  constructor() { 
  }

  ngOnInit() {
  }

}
