import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { UpdateComponent } from './update.component';
import { StatusComponent } from '../components/status/status.component';
import { AddPersonComponent } from '../components/add-person/add-person.component'
import { DeletePersonComponent } from '../components/delete-person/delete-person.component'

@NgModule({
  declarations: [
    AppComponent,
    UpdateComponent,
    StatusComponent,
    AddPersonComponent,
    DeletePersonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([UpdateComponent, StatusComponent, AddPersonComponent])
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }