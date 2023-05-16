import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { AjouterCategorieComponent } from './categories/ajouter-categorie/ajouter-categorie.component';
import { PaysComponent } from './pays/pays.component';
import { PlaceComponent } from './place/place.component';
import { AjouterpaysComponent } from './pays/ajouterpays/ajouterpays.component';
import { AddplaceComponent } from './place/addplace/addplace.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: CategoriesComponent  },
  { path: 'ajouterCategory', component: AjouterCategorieComponent  },
  { path: 'pays', component: PaysComponent  },
  { path: 'ajouterPays', component: AjouterpaysComponent  },
  { path: 'places', component: PlaceComponent  },
  { path: 'addPlace', component: AddplaceComponent  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
