import { Component, OnInit } from '@angular/core';
import { AgRendererComponent, INoRowsOverlayAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';
import { FormsModule } from '@angular/forms'
import { AppComponent } from '../../app/app.component'

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit, AgRendererComponent {

  dataValue: string;
  //Maybe delete?
  params:any;

  gridApi: any;
  columnApi: any;
  rowNode: any;

  status: any[] =
  [
    {number: 0, name: 'Backlog'},
    {number: 1, name: 'In Progress'},
    {number: 2, name: 'In Review'},
    {number: 3, name: 'Completed'}
  ]

  constructor() {   }

  ngOnInit(): void { }

  refresh(params: ICellRendererParams): boolean { 
    this.gridApi.setColumnDefs(this.addUpdateColumn());
    this.gridApi.sizeColumnsToFit();
    return false; 
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.dataValue = params.value;
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.rowNode = params.node;
  }
    
  //Maybe use to grab status enums dynamically from api
  setStatusData(){ this.params.context }

  getStatus(event){
    this.rowNode.setDataValue("status", Number.parseInt(this.dataValue));
  }
  //End get status api
  
  //Full columns layout for table
  addUpdateColumn(){
    return [
        { headerName: 'ID', field: 'id', minWidth: 40 },
  {
    headerName: 'Description',
    field: 'description',
    editable: true,
    minWidth: 200,
  },
  {
    headerName: 'Status',
    field: 'status',
    cellRenderer: 'statusComponent',
    cellEditorParams: {
      cellRenderer: 'statusComponent',
    },
    minWidth: 120,
  },
  {
    headerName: 'Update',
    cellRenderer: 'updateComponent',
    minWidth: 80,
  },
  {
    headerName: 'Add Action',
    cellRenderer: 'addComponent',
    minWidth: 140,
  },
  {
    headerName: 'Delete Action',
    cellRenderer: 'deleteComponent',
    minWidth: 80,
  },
    ]
}

}
