import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Author} from "../model/author";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  addAuthor(id: number, author: Author): Observable<any> {
    return this.http.put(`${this.baseUrl}/author/add/${id}`, author);
  }

  getAuthorList(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/author/list/${id}`);
  }

  deleteAuthor(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/author/remove/${id}`);
  }

}
