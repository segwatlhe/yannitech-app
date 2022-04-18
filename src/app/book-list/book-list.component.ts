import {Component, OnInit} from '@angular/core';
import {Book} from '../model/book';
import {Observable, throwError} from 'rxjs';
import {BookService} from '../service/book.service';
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

  deleteBook(id: number) {

    this.bookService.deleteBook(id).subscribe(
      data => {
        this.reloadData();
      },
      error => {
        this.handleError(error);
        this.notifyService.showError('Book delete unsuccessful', 'Yannitech BookStore');
      },
      () => {
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
