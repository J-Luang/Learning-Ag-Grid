import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-delete-person',
  templateUrl: './delete-person.component.html',
  styleUrls: ['./delete-person.component.css']
})
export class DeletePersonComponent implements OnInit, AgRendererComponent {
  rootURL = 'http://localhost:23345/api/Person';

  dataValue: any;
  gridApi: any;
  columnApi: any;
  rowNode: any;

  constructor(private http: HttpClient) { 
    
  }
  ngOnInit(): void { }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  agInit(params: ICellRendererParams): void {
    this.dataValue = params;
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.rowNode = params.node;
  }

  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    throw new Error('Method not implemented.');
  }

  deletePerson(){
    const httpOptions ={
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    var personToDelete = this.dataValue.data;
    var endpointURL = this.rootURL + "/deletePerson/" + personToDelete.id;
    this.gridApi.applyTransaction({
      remove: [personToDelete]
    });
    return this.http.delete(endpointURL, httpOptions).subscribe((data)=>data);
    }

}
