import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/Auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username!: string;
  email!: string;
  recaptcha!: string;
  password!: string;
  usernameValid = true;
  emailValid = true;
  passwordValid = true;
  recaptchaValid = true;
  registrationForm!: FormGroup;
  constructor(private authService: AuthService,
    private formBuilder: FormBuilder, private router: Router) { 

  }
  ngOnInit() {
   
  }
  register(): void {
    // Validate the form fields
    this.validateFields();

    if (this.isFormValid()) {
      const user = {
        username: this.username,
        email: this.email,
        password: this.password,
        recaptcha : this.recaptcha
      };

      this.authService.register(user).subscribe(
        (response) => {
          // Handle successful registration
          console.log('Registration successful:', response);
          Swal.fire({
            icon: 'success',
            title: 'Registration success',
            showConfirmButton: false,

            timer: 1500

          });
this.router.navigate(['/login']);
        },
        (error) => {
        
          // Handle registration error
          Swal.fire({
            icon: 'error',
            title: 'Oops...',

            text: 'already exist',
            footer: '<a href>Why do I have this issue?</a>'
          });


          console.error('Registration error:', error.message);
        }
      );
    }
  }

  validateFields(): void {
    // Validate username
    this.usernameValid = !!this.username;

    // Validate email
    this.emailValid = !!this.email;

    // Validate password
    this.passwordValid = !!this.password;

    // Validate recaptcha
    this.recaptchaValid = !!this.recaptcha;
  }

  isFormValid(): boolean {
    return this.usernameValid && this.emailValid && this.passwordValid && this.recaptchaValid;
  }

  siteKey: string = "6Ld8HIYjAAAAALw437G-L_PF1PNrNZH4Qq76MvSU";
}
