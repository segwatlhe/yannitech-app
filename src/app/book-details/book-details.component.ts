import {Component, OnInit} from '@angular/core';
import {Book} from '../model/book';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../service/book.service';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  id: number;
  book: Book;

  constructor(private route: ActivatedRoute, private router: Router,
              private bookService: BookService) {
  }

  ngOnInit() {
    this.book = new Book();

    this.id = this.route.snapshot.params.id;

    this.bookService.getBook(this.id)
      .subscribe(data => {
        this.book = data;
      }, error => {
        this.handleError(error);
      });
  }

  list() {
    this.router.navigate(['books']);
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
