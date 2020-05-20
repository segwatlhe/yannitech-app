import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private baseUrl = 'http://localhost:8080/yannitech/api/v2/book';
  
  constructor(private http: HttpClient) { }

  // createAuthor(id: number, author: any): Observable<Object> {
  //   return this.http.post(`${this.baseUrl}/${id}`, author);
  // }

  // createAuthor(id: number, author: any): Observable<Object> {
  //   return this.http.put(`${this.baseUrl}`, author);
  // }
  createAuthor(author: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}`, author);
  }

  getAuthorList(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}/authors`);
  }

  deleteAuthor(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
