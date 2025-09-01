import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../services/user';

@Component({
  selector: 'app-edit',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './edit.html',
  styleUrl: './edit.scss',
})
export class Edit {
  data: any;
  signupForm!: FormGroup;
  userId!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userservice: User
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;

    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id')!;
      console.log('Received user ID:', this.userId);
      this.userservice.getUserById(this.userId).subscribe((response) => {
        this.data = response;
        this.signupForm.patchValue(this.data.user);
      });
    });
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      Address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(userId: string): void {
    if (this.signupForm.valid) {
      console.log('Form submitted:', this.signupForm.value);
      this.userservice.update(this.signupForm.value, userId).subscribe((response) => {
        console.log('User updated successfully:', response);
        this.router.navigate(['/home']);
      });
      // Add your submit logic here (e.g., API call)
    }
  }
}
