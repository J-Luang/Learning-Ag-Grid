import { Component } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Person } from './person';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'; 

@Component({
    selector: 'update-component',
    template: '<button (click)="updateSomething($event)">Update</button>'
})
export class UpdateComponent implements AgRendererComponent{
    private cellValue: any;
    gridApi: any;

    constructor(private http: HttpClient){}

    //Look at notes in txt
    refresh(params: ICellRendererParams): boolean {
        
        throw new Error('Method not implemented.');
    }

    agInit(params: ICellRendererParams): void {
        this.gridApi = params.api;
        this.cellValue = params;
    }

    getValueToDisplay(params: ICellRendererParams) {
        return params.valueFormatted ? params.valueFormatted : params.value;
      }

    updateSomething(event){       
        let rowNode = this.cellValue.data;
        const endpointURL = 'http://localhost:23345/api/Person/updatePerson';
        console.log(rowNode);
        return this.http.put(endpointURL, rowNode).subscribe((data) => data);
    }

    getStatus(): number{
        return this.cellValue.data.status;
    }

    
}