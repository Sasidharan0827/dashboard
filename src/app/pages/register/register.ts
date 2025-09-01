import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../services/user';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private userService: User) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      Address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      console.log('Form submitted:', this.signupForm.value);
      this.userService.register(this.signupForm.value).subscribe({
        next: (response) => {
          this.router.navigate(['']);
          console.log('Registration successful:', response);
        },
        error: (error) => {
          console.error('Registration failed:', error);
        },
      });
    }
  }
  gotologin() {
    this.router.navigate(['']);
  }
}
