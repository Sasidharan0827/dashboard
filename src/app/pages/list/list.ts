import { ChangeDetectorRef, Component } from '@angular/core';

import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../services/user';

@Component({
  selector: 'app-list',
  imports: [TableModule],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  constructor(private router: Router, private userservice: User, private cdr: ChangeDetectorRef) {}
  response: any;
  users: any[] = [];

  ngOnInit() {
    this.ongetall();
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
        this.users = response.users;
        this.cdr.detectChanges();
        console.log('Fetched users:', this.users);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
    });
  }
}
