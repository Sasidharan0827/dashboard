import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../services/user';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ToastModule, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  providers: [MessageService],
})
export class Login {
  signinForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private userService: User
  ) {}

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onlogin(): void {
    if (this.signinForm.valid) {
      this.userService.login(this.signinForm.value).subscribe({
        next: (response) => {
          this.router.navigate(['/home/']);
          this.showToast('success', 'Success', 'Login successful!');
        },
        error: (error) => {
          this.showToast('error', 'Error', 'Login failed. Please try again.');
        },
      });
    } else {
      this.showToast('error', 'Error', 'Login failed. Please try again.');
    }
  }

  gotoregister(): void {
    this.router.navigate(['/register']);
  }
  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
