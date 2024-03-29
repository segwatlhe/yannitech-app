import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookListComponent } from './book-list/book-list.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CreateAuthorComponent } from './create-author/create-author.component';
import { BookFindComponent } from './book-find/book-find.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {PdfViewerModule} from "ng2-pdf-viewer";


@NgModule({
  declarations: [
    AppComponent,
    CreateBookComponent,
    BookDetailsComponent,
    BookListComponent,
    UpdateBookComponent,
    CreateAuthorComponent,
    BookFindComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        NgxPaginationModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
