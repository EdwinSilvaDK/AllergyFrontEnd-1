import {Component, OnInit} from '@angular/core';
import {ProductService} from '../shared/product.service';
import {Router} from '@angular/router';
import {IngredientService} from '../ingredient/shared/ingredient.service';
import {Ingredient} from '../ingredient/shared/ingredient.model';

@Component({
  selector: 'app-product',
  templateUrl: './allergy.component.html',
  styleUrls: ['./allergy.component.css']
})
export class AllergyComponent implements OnInit {

  constructor(private productService: ProductService,
              private router: Router,
              private ingredientService: IngredientService) {
  }
  ingredients: Ingredient[];
  selectedIngredients: Array<Ingredient> = [];
  ngOnInit() {
    this.ingredientService.getIngredients()
      .subscribe(
        ingredients => {
          this.ingredients = ingredients;
        }
      );
  }
  productsById() {
      this.router.navigateByUrl('product-list');
  }

    toShoppingList() {
    this.router.navigateByUrl('/shopping-list');
  }

  backToLogin() {
    this.router.navigateByUrl('/login');
  }
  addToExclusiveList(ing: Ingredient) {
    for (let i = 0; i < this.selectedIngredients.length; i++) {
      if (this.selectedIngredients[i] === ing) {
        this.selectedIngredients.push(ing);
      }
    }
    this.selectedIngredients.push(ing);
  }
  clearFromExclusiveList() {
    this.selectedIngredients = [];
  }
}
