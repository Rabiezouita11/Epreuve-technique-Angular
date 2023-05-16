import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/Auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;
  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private http: HttpClient,

    private router: Router   ) { }

    ngOnInit(): void {

      this.form = this.formBuilder.group(
        {
  
          email: [null, [Validators.required , Validators.email]],
          password: [null, [Validators.required, Validators.minLength(2)]],
        }
  
      );
    }
    get f(): { [key: string]: AbstractControl  } {
      return this.form.controls;
    }

    submit(): void {

      this.submitted = true;
  
      if (this.form.invalid) {
        return;
      }else{
  
  // how catch the response from the server in notifcation in angular 13 ?
  
  
  try {
    this.authService.login(this.form.value).subscribe((response: any) => {
      const token = response.token;
      localStorage.setItem('token', token);
      console.log(response);
   Swal.fire({

    icon: 'success',
    title: 'login success',
    showConfirmButton: false,
    timer: 1500
  });

        this.router.navigate(['/dashboard']);
     /*  this.document.location.href = 'http://localhost:4200/accueil' */
    }, (error) => {
      console.log(error);
      if (error.status === 401 ) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'check your email or password',
          footer: '<a href>Why do I have this issue?</a>'
          });
      }
      if (error.status === 404 ) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'check your email or password',
          footer: '<a href>Why do I have this issue?</a>'
          });
  
  
        
      }
      if  (error.status === 504) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'check your email or password',
          footer: '<a href>Why do I have this issue?</a>'
          });
      }
      if (error.status === 500) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Server Error',
          footer: '<a href>Why do I have this issue?</a>'
          });
      }
  
  
  
    }
    );
   //
  
  
  } catch (error) {
    // how show error in toast notification in angular 13 ?
    console.log(error);
  
    }
  }
  
    }
}
