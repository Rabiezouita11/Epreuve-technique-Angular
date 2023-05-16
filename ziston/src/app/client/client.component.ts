import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../service/categorie/categorie.service';
import { Categories } from '../models/categories';
import { Pays } from '../models/pays';
import { PaysService } from '../service/Pays/pays.service';
import { Place } from '../models/place';
import { PlaceService } from '../service/Place/place.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit  {

  list: Categories[] = [];
  paysList: Pays[] = [];
  PlacesList: Place[] = [];
  constructor(private categoryService: CategorieService , private paysService: PaysService , private PlaceService: PlaceService) { }

  ngOnInit(): void {
    this.fetchLatestListings();
    this.fetchPays();
    this.fetchCategories();

  }
  fetchCategories() {
    this.categoryService.getCategories().subscribe(
      (response) => {
        this.list = response.categories; // Assign the fetched data to the component property
      },
      (error) => {
        console.error(error); // Handle the error response
      }
    );
  }
  fetchPays() {
    this.paysService.getAllPays().subscribe(
      (response) => {
        this.paysList = response; // Assign the fetched pays to the component property
      },
      (error) => {
        console.error(error); // Handle the error response
      }
    );
  }
  fetchLatestListings() {
    this.PlaceService.getAllPlaces().subscribe(
      (places: Place[]) => {
        this.PlacesList = places; 
        console .log("rerrrr"+this.PlacesList);
        // Assign the fetched data to the component property
      },
      (error) => {
        console.error(error); // Handle the error response
      }
    );
  }
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  toggleSideMenu(): void {
    // Add your logic to show/hide the side menu
    // For example, you can toggle a CSS class on the side menu element
    const sideMenu = document.querySelector('.side-menu__block');
    sideMenu?.classList.toggle('active');
  }
  toggleSideMenu1(): void {
    const sideMenu = document.querySelector('.side-menu__block');
    sideMenu?.classList.remove('active');
  }
  
}
