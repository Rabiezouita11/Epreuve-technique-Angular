import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Place } from 'src/app/models/place';
import { PlaceService } from 'src/app/service/Place/place.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addplace',
  templateUrl: './addplace.component.html',
  styleUrls: ['./addplace.component.css']
})
export class AddplaceComponent implements OnInit {
  places: Place[] = [];
  newPlace: Place = {
    name: '',
  };
  constructor(private placeService: PlaceService,private router: Router) { }
  ngOnInit(): void {

  }
  addPlace(): void {


    console.log(this.newPlace);
    this.placeService.createPlace(this.newPlace).subscribe(
      (createdPlace: Place) => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your Place has been saved',
        showConfirmButton: false,
        timer: 1500
      })
       
        this.router.navigate(['/places']);
        
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<p>There was an error while creating the place.</p>'
        })

        console.error(error);
        // Handle error
      }
    );
  }
}
