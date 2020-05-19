import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss']
})
export class UpdateBookComponent implements OnInit {

  public submitted: boolean = false;

  id: number;
  book: Book;

  constructor(private notifyService : NotificationService, 
              private route: ActivatedRoute,
              private router: Router,
              private bookService: BookService) { }

  ngOnInit() {
    this.book = new Book();

    this.id = this.route.snapshot.params['id'];
    
    this.bookService.getBook(this.id)
      .subscribe(data => {
        console.log(data)
        this.book = data;
      }, error => console.log(error));
  }

  updateBook() {
    this.bookService.updateBook(this.id, this.book)
      .subscribe(data => console.log(data), error => console.log(error));
    this.book = new Book();
    this.gotoList();
    this.notifyService.showSuccess("Book update successful.", "Yannitech BookStore")
  }

  onSubmit() {
    this.updateBook();    
  }

  gotoList() {
    this.router.navigate(['/books']);
  }

  list(){
    this.router.navigate(['books']);
  }
}
