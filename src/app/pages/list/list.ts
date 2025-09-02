import { ChangeDetectorRef, Component } from '@angular/core';

import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../services/user';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, pipe, Subscription, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list',
  imports: [TableModule, ReactiveFormsModule],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  constructor(
    private router: Router,
    private userservice: User,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {}
  response: any;
  users: any[] = [];
  searchControl = new FormControl('');
  results: any[] = [];
  private searchSubscription!: Subscription;
  ngOnInit() {
    this.ongetall();

    this.searchSubscription = this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        if (query && query.trim() !== '') {
          this.triggerSearch(query);
        } else {
          this.ongetall();
        }
      });
  }

  triggerSearch(query: string): void {
    this.userservice.search(query).subscribe(
      (results: any) => {
        console.log('Search results:', results);
        this.users = results.data;
      },
      (error) => {
        console.error('Search error:', error);
      }
    );
  }

  gotoedit(id: string) {
    this.router.navigate(['/home/edit', id]);
  }
  deleteUser(id: string) {
    this.userservice.delete(id).subscribe({
      next: (response) => {
        console.log('User deleted successfully:', response);
        this.users = this.users.filter((user) => user.id !== id);
        this.ongetall();
      },
      error: (error) => {
        console.error('Error deleting user:', error);
      },
    });
  }
  ongetall() {
    this.userservice.getall().subscribe({
      next: (response: any) => {
        this.users = response.data || response.users;
        this.cdr.detectChanges();
        console.log('Fetched users:', this.users);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
    });
  }
}
