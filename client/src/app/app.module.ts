import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { QueryService } from './query.service';
import { G3TableComponent } from './g3-table/g3-table.component';

@NgModule({
  declarations: [
    AppComponent,
    G3TableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [QueryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
