import { Component, OnInit } from '@angular/core';
import { Place } from 'src/app/models/place';
import { PlaceService } from 'src/app/service/Place/place.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {
  places: Place[] = [];
  constructor(private placeService: PlaceService) { }
  ngOnInit(): void {
    this.getAllPlaces();

  }
  getAllPlaces(): void {
    this.placeService.getAllPlaces().subscribe(
      (places: Place[]) => {
        this.places = places;
        console .log('*******************************');
        console.log(this.places);
      },
      (error) => {
        console.error(error);
        // Handle error
      }
    );
  }

  deletePlace(placeId: string | undefined): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Place!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',

    }).then((result) => {
      if (result.value) {

    this.placeService.deletePlace(placeId).subscribe(
      () => {
        // Remove the deleted place from the local places array
        this.getAllPlaces();
      },
      (error) => {
        console.error(error);
        // Handle error
      }
    );
  }
})
}
}

