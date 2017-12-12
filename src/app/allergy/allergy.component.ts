import {Component, InjectableDecorator, OnInit} from '@angular/core';
import {ProductService} from '../shared/product.service';
import {Router} from '@angular/router';
import {IngredientService} from '../ingredient/shared/ingredient.service';
import {Ingredient} from '../ingredient/shared/ingredient.model';
import {forEach} from '@angular/router/src/utils/collection';
import {log} from 'util';

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
  addToExlusiveList(ing: Ingredient) {
    this.selectedIngredients.forEach(function (x) {
      if (x.id === ing.id) {
        this.selectedIngredients.push(ing);
      }
    });
    this.selectedIngredients.push(ing);
  }
  clearFromExlusiveList() {
    this.selectedIngredients = [];
  }
}
