import { Component, OnInit } from '@angular/core';
import { Pays } from 'src/app/models/pays';
import { PaysService } from 'src/app/service/Pays/pays.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.css'],

})
export class PaysComponent implements OnInit {
  paysList: Pays[] = [];

  constructor(private paysService: PaysService) {}

  ngOnInit(): void {
    this.getAllPays();
  }

  getAllPays(): void {
    this.paysService.getAllPays().subscribe(
      (pays: Pays[]) => {
        this.paysList = pays;
      },
      (error) => {
        console.error(error);
        // Handle error
      }
    );
  }
  deletePays(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Pays!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',

    }).then((result) => {
      if (result.value) {

    this.paysService.deletePays(id).subscribe(
      (pays: Pays) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: `The pays ${pays.name} has been deleted successfully.`,
          showConfirmButton: false,
          timer: 1500,
        });

        // Handle success
        this.getAllPays();
      },
      (error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<p>There was an error while deleting the pays.</p>',
        });
        
        // Handle error
      }
    );
  }
}
)
}
}
