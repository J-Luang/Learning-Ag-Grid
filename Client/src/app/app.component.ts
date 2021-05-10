import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { UpdateComponent } from './update.component';
import { StatusComponent } from '../components/status/status.component';
import { AddPersonComponent } from '../components/add-person/add-person.component';

import { Observable } from 'rxjs';
import { DeletePersonComponent } from 'src/components/delete-person/delete-person.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Client';
  person: any;
  status: number;

  //Begin Grid Variables
  // @ViewChild('agGrid') agGrid: AgGridAngular;

  frameworkComponents = {
    updateComponent: UpdateComponent,
    statusComponent: StatusComponent,
    addComponent: AddPersonComponent,
    deleteComponent: DeletePersonComponent,
  };

  rowHeight;
  colWidth;
  gridApi: any;
  columnApi: any;
  rowSelection: any;
  data: any;
  rowModelType: any;
  defaultColDef;

  columns = [
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
      headerName: 'Delete Action',
      cellRenderer: 'deleteComponent',
      minWidth: 80,
    },
  ];
  //End Grid Variables

  constructor(private http: HttpClient) {
    this.rowSelection = 'multiple';
    this.rowModelType = 'serverSide';

    this.defaultColDef = {
      // resizable: true
    };
  }

  ngOnInit() {}

  autoSizeAll(skipHeader) {
    var allColumnIds = [];
    this.columnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    this.columnApi.autoSizeColumns(allColumnIds, skipHeader);
  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  //Gets data and populates grid using Ag-grid api
  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.data = params;

    this.http.get('http://localhost:23345/api/Person').subscribe((data) => {
      params.api.setRowData(data);
    });
    params.api.setRowData();
    this.sizeToFit();
  }

//new comment

  //Create new row start
  addNewRow() {
    this.gridApi.setColumnDefs(this.fullTableColDefs());
    this.sizeToFit();
    this.gridApi.applyTransaction({
      add: [this.createNewPerson()],
    });
  }

  getNewMaxId(): number {
    let rowData = [];
    this.gridApi.forEachNode((node) => rowData.push(node.data.id));
    return Math.max(...rowData) + 1;
  }

  createNewPerson() {
    return {
      id: this.getNewMaxId(),
      description: 'New Person',
      status: '',
    };
  }
  //create new row end

  //Full table columns
  fullTableColDefs() {
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
    ];
  };

  //Use below to get a string from api (IMPORTANT: responseType: 'text')
  // getString(){
  //   this.http.get('https://localhost:5001/API/Animal', {responseType: 'text'}).subscribe(
  //     response => {
  //       this.holderString = response;
  //     }
  //   );
  // }
}
