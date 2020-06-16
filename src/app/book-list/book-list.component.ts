import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book';
import { Observable } from 'rxjs';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  // find book
  book: Book = new Book();

  books: Observable<Book[]>;

  constructor(private notifyService : NotificationService, 
              private bookService: BookService, 
              private router: Router) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.books = this.bookService.getBookList();
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error)
        );

        this.notifyService.showSuccess("Book delete successful.", "Yannitech BookStore")
  }

  // routing
  bookDetails(id: number){
    this.router.navigate(['details', id]);
  }

  // routing
  updateBook(id: number){
    this.router.navigate(['update', id]);
  }

  // routing
  addAuthor(id: number){
    this.router.navigate(['addAuthor', id]);
  }

  onSubmit(form){
    //console.log(title);
    this.bookService.findBook(this.book.title).subscribe(data => console.log('1 '+data), error => console.log('2 ' +error));
    this.book = new Book();
    this.notifyService.showSuccess("Book found", "Yannitech BookStore")
  }
}
