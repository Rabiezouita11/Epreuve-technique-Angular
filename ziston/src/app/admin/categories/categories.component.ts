import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/models/categories';
import { CategorieService } from 'src/app/service/categorie/categorie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  list: Categories[] = [];

  constructor(private categoryService: CategorieService) { }

  ngOnInit(): void {
    this.fetchCategories();

  }
  fetchCategories() {
    this.categoryService.getCategories().subscribe(
      (response: any) => {
        this.list = response.categories; // Assign the fetched categories to the component property
        console.log(this.list);
      },
      (error) => {
        console.error(error); // Handle the error response
      }
    );
  }
  deleteCategory(id:number  ){

  
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',

      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result:any) => {
      if (result.isConfirmed) {
        
    this.categoryService.deleteCategory(id).subscribe(
      (response) => {
     Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )

        this.fetchCategories();
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',

          text: 'Something went wrong!',
          footer: '<a href>Why do I have this issue?</a>'
        })

        console.error(error);
      }
    );
  }
}

    )
  }
}

