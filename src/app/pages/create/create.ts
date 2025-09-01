import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../services/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './create.html',
  styleUrl: './create.scss',
})
export class Create {
  signupForm!: FormGroup;
  constructor(private fb: FormBuilder, private userservice: User, private router: Router) {}

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
      this.userservice.register(this.signupForm.value).subscribe((response) => {
        console.log('User registered successfully:', response);
        this.router.navigate(['/home']);
      });
      // Add your submit logic here (e.g., API call)
    }
  }
}
