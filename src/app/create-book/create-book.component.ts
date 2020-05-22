import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { NotificationService } from '../service/notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  book: Book = new Book();
  books: Observable<Book[]>;
  submitted = false;

  constructor(private notifyService : NotificationService, 
              private bookService: BookService, 
              private router: Router) { }

  ngOnInit() {
  }

  newBook(): void {
    this.submitted = false;
    this.book = new Book();
  }

  reloadData() {
    this.books = this.bookService.getBookList();
  }

  save() {
    this.bookService.createBook(this.book)
      .subscribe(data => {
        console.log(data);
        this.reloadData();
      }
        , error => console.log(error));
    this.book = new Book();
    this.gotoList();
    this.notifyService.showSuccess("Book save successful", "Yannitech BookStore")
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/books']);
  }
  list(){
    this.router.navigate(['books']);
  }
}
