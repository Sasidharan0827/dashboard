import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  constructor(private router: Router) {}
  gotodashboard() {
    this.router.navigate(['/home/']);
  }

  gotoUserList() {
    this.router.navigate(['/home/list']);
  }

  gotoAddUser() {
    this.router.navigate(['/home/create']);
  }

  logout() {
    this.router.navigate(['']);
  }
}
