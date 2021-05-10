import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit, AgRendererComponent {
  rootURL = 'http://localhost:23345/api/Person';

  dataValue: any;
  gridApi: any;
  columnApi: any;
  rowNode: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  refresh(params: ICellRendererParams): boolean { return false; }

  agInit(params: ICellRendererParams): void {
    this.dataValue = params;
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.rowNode = params.node;
  }

  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    throw new Error('Method not implemented.');
  }

  addPerson(){
    var endpointUrl = this.rootURL + "/addPerson";
    var newPerson = this.dataValue.data;
    return this.http.post(endpointUrl, newPerson).subscribe((data) => data);
  }

}
