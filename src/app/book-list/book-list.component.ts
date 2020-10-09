import {Component, OnInit} from '@angular/core';
import {Book} from '../model/book';
import {Observable, throwError} from 'rxjs';
import {BookService} from '../book.service';
import {Router} from '@angular/router';
import {NotificationService} from '../service/notification.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  // find book
  book: Book = new Book();
  books: Observable<Book[]>;

  constructor(private notifyService: NotificationService,
              private bookService: BookService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.books = this.bookService.getBookList(); // returning an observable
  }

  // Subscribing "kicks off" the observable stream
  // ***** The subscribe method takes in an observer. An observer has three methods: ****

  /****
   1) The method to process each time an item is emitted from the observable. NEXT;
   2) The method to process any error that occurs. ERROR;
   3) The method to clean up anything when the observer completes.;
   () => This last one is seldom used when working with Angular's observables. COMPLETE
   */

  /* EXAMPLE
   method() {
    this.bookService.getBookList().subscribe(
      data => {
        console.log('Observer got a next value: ' + data);
      },
      error => {
        console.error('Observer got an error: ' + error);
        this.notifyService.showError('Book list could not be retrieved.', 'Yannitech BookStore');
      },
      () => {
        console.log('Observer got a complete notification');
        this.notifyService.showInfo('Book delete successful.', 'Yannitech BookStore');
      }
    );
  }
   */

  // EXAMPLE
  // this.bookService.deleteBook(id).subscribe(
  //   data => console.log('Observer got a next value: ' + data),
  //   error => console.error('Observer got an error: ' + error),
  //   () => console.log('Observer got a complete notification')
  // );

  deleteBook(id: number) {

    // this.bookService.deleteBook(id).subscribe();

    this.bookService.deleteBook(id).subscribe(
      data => {
        console.log('Observer got a next value: ' + data);
        this.reloadData();
      },
      error => {
        console.error('Observer got an error: ' + error);
        this.handleError(error);
        this.notifyService.showError('Book delete unsuccessful', 'Yannitech BookStore');
      },
      () => {
        console.log('Observer got a complete notification');
        this.notifyService.showSuccess('Book delete successful.', 'Yannitech BookStore');
      }
    );

  }

  // routing
  bookDetails(id: number) {
    this.router.navigate(['details', id]);
    this.notifyService.showInfo('Book Details.', 'Yannitech BookStore');
  }

  // routing
  updateBook(id: number) {
    this.router.navigate(['update', id]);
  }

  // routing
  addAuthor(id: number) {
    this.router.navigate(['addAuthor', id]);
  }

  onSubmit(form) {
    this.bookService.findBook(this.book.title).subscribe(
      () => {
        this.notifyService.showError('Book found', 'Yannitech BookStore');
      },
      error => {
        this.handleError(error);
        this.notifyService.showError('Book not found', 'Yannitech BookStore');
      });
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
