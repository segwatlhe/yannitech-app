import {Component, OnInit} from '@angular/core';
import {Book} from '../model/book';
import {throwError} from 'rxjs';
import {BookService} from '../service/book.service';
import {Router} from '@angular/router';
import {NotificationService} from '../service/notification.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  constructor(private notifyService: NotificationService,
              private bookService: BookService,
              private router: Router,
              private fb: FormBuilder) {
  }

  searchForm: FormGroup;
  pageCustomer = 1;
  countCustomer = 10;
  books: Book[];

  // Subscribing "kicks off" the observable stream
  // ***** The subscribe method takes in an observer. An observer has three methods: ****

  /****
   1) The method to process each time an item is emitted from the observable. NEXT;
   2) The method to process any error that occurs. ERROR;
   3) The method to clean up anything when the observer completes.;
   () => This last one is seldom used when working with Angular's observables. COMPLETE
   */

  book: Book;

  ngOnInit(): void {
    this.getBooks();
    this.buildRegistrationFrom();
  }

  getBooks() {
    this.bookService.getBookList().subscribe(
      data => {
        this.books = data;
      },
      error => {
        this.handleError(error);
      }
    );
  }

  buildRegistrationFrom() {
    this.searchForm = this.fb.group({
        title: new FormControl('')
      }
    );
  }
  deleteBook(id: number) {

    this.bookService.deleteBook(id).subscribe(
      data => {
        this.notifyService.showSuccess('Book delete successful.', 'Yannitech BookStore');
      },
      error => {
        this.handleError(error);
        this.notifyService.showError('Book delete unsuccessful', 'Yannitech BookStore');
      },
      () => {
        this.getBooks();
      }
    );

  }

  // routing
  bookDetails(id: number) {
    this.router.navigate(['details', id]);
    this.notifyService.showWarning('Book Details cannot be edited.', 'Yannitech BookStore');
  }

  // routing
  updateBook(id: number) {
    this.router.navigate(['update', id]);
  }

  // routing
  addAuthor(id: number) {
    this.router.navigate(['addAuthor', id]);
  }

  search() {
    this.bookService.search(this.searchForm.get('title').value).subscribe(
      data => {
        this.books = data.content;
        this.notifyService.showInfo('Search completed.', 'Yannitech BookStore');
      },
      error => {
        this.handleError(error);
        this.notifyService.showError('Unable to search.', 'Yannitech BookStore');
      }
    );
  }

  // error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
      console.log('client-side error ' + errorMessage);
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      console.log('server-side error ' + errorMessage);
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
