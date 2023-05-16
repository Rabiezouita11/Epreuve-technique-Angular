import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from 'src/app/service/categorie/categorie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouter-categorie',
  templateUrl: './ajouter-categorie.component.html',
  styleUrls: ['./ajouter-categorie.component.css']
})
export class AjouterCategorieComponent   implements OnInit{
  @ViewChild('inputimage', { static: false }) inputimage!: ElementRef;
  @ViewChild('inputnom') inputnom!: ElementRef;

  submitted = false;
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    Image: new FormControl(''),
    inputdelete: new FormControl(''),
  });
  constructor(private currentRoute: ActivatedRoute , private router: Router,private categoriesService:CategorieService,  private formBuilder: FormBuilder ,  private http: HttpClient) { }

    
  
 
 
 
 
 
 
 
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        Image: ['', Validators.required],

      }
      );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    const image = this.inputimage.nativeElement.files[0];

    const nom = this.inputnom.nativeElement.value;
    const formData = new FormData();
    formData.set('image', image);
    formData.set('nom', nom);
  
  this.categoriesService.createCategory(formData).subscribe(
    (data : any)=>{
      Swal.fire({

        icon: 'success',
        title: 'Votre categorie a été ajouté avec succés',
        showConfirmButton: false,
        timer: 1500
      });
     this.router.navigate(['/dashboard']);
    },
    (error)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });


  }
  );


}
}

    