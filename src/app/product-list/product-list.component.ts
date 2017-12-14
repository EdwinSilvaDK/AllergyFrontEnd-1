import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/product.service';
import {Router} from '@angular/router';
import {Product} from '../shared/product.model';
import {Ingredient} from '../ingredient/shared/ingredient.model';
import {IngredientService} from '../ingredient/shared/ingredient.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService,
              private ingredientService: IngredientService,
              private router: Router) { }
  selectedIngredientsIds: Array<number> = [];
  product: Product;
  products: Product[];
  ingredientList: Ingredient[];
  filteredProducts: Product[];
  ngOnInit() {
    this.selectedIngredientsIds = this.productService.getfilteredList();
    this.productService.createFilteredList(this.selectedIngredientsIds).subscribe(products => {
      this.filteredProducts = products;
      this.productService.DeletefilteredList();
    });
    this.ingredientService.getIngredients()
      .subscribe(
        ingredients => {
          this.ingredientList = ingredients;
        });
  }
  backToAllergies() {
    this.router.navigateByUrl('/allergy');
  }
  toShoppingList() {
    this.router.navigateByUrl('/shopping-list');
  }
  addProduct(name: string) {
     return this.productService.addToShoppingList(name);
  }
}
