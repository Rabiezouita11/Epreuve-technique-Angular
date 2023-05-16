import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ComponentComponent } from './component/component.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidbarComponent } from './sidbar/sidbar.component';
import { CategoriesComponent } from './categories/categories.component';
import { AjouterCategorieComponent } from './categories/ajouter-categorie/ajouter-categorie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlaceComponent } from './place/place.component';
import { PaysComponent } from './pays/pays.component';
import { AjouterpaysComponent } from './pays/ajouterpays/ajouterpays.component';
import { AddplaceComponent } from './place/addplace/addplace.component';


@NgModule({
  declarations: [
    ComponentComponent,
    HeaderComponent,
    FooterComponent,
    SidbarComponent,
    CategoriesComponent,
    AjouterCategorieComponent,
    PlaceComponent,
    PaysComponent,
    AjouterpaysComponent,
    AddplaceComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AdminModule { }
