import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pays } from 'src/app/models/pays';
import { PaysService } from 'src/app/service/Pays/pays.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouterpays',
  templateUrl: './ajouterpays.component.html',
  styleUrls: ['./ajouterpays.component.css']
})
export class AjouterpaysComponent implements OnInit{
  paysForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private paysService: PaysService,private router: Router) {}

  ngOnInit(): void {
    this.createPaysForm();
  }

  createPaysForm(): void {
    this.paysForm = this.formBuilder.group({
      name: ['', Validators.required],
      listingsCount: [0, Validators.required]
    });
  }

  onSubmit(): void {
    console.log(this.paysForm.value);
    if (this.paysForm.invalid) {
      return;
    }

    const paysData: Pays = {
      _id: '',
      name: this.paysForm.value.name,
      listingsCount: this.paysForm.value.listingsCount
    };

    this.paysService.createPays(paysData).subscribe(
      (pays: Pays) => {
        // Handle success
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: `The pays ${pays.name} has been created successfully.`,
          showConfirmButton: false,
          timer: 1500
        });
this.router.navigate(['/pays']);

      },
      (error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<p>There was an error while creating the pays.</p>'
        });
        
        // Handle error
      }
    );
  }
}