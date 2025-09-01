import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class User {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${this.baseUrl}/user/login`, data);
  }
  register(data: any) {
    return this.http.post(`${this.baseUrl}/user/register`, data);
  }
  update(data: any, id: string) {
    return this.http.put(`${this.baseUrl}/user/update/${id}`, data);
  }
  getall() {
    return this.http.get(`${this.baseUrl}/user/list`);
  }
  getUserById(id: string) {
    console.log('Fetching user with ID For update:', id);
    return this.http.get(`${this.baseUrl}/user/get/${id}`);
  }
  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/user/delete/${id}`);
  }
}
