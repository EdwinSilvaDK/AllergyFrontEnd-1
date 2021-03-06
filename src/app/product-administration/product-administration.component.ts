import {Component, OnInit, state} from '@angular/core';
import {ProductService} from '../shared/product.service';
import {Product} from '../shared/product.model';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Ingredient} from '../ingredient/shared/ingredient.model';
import {IngredientService} from '../ingredient/shared/ingredient.service';




@Component({
  selector: 'app-product-administration',
  templateUrl: './product-administration.component.html',
  styleUrls: ['./product-administration.component.css']
})
export class ProductAdministrationComponent implements OnInit {
  productGroup: FormGroup;
  ingredientGroup: FormGroup;
  product: Product;
  products: Product[];
  ingredients: Ingredient[];
  ingredientIdList: Array<number> = [];
  confirmDelete= false;
  confirmEdit= false;
  productToDelete: Product;
  productToEdit: Product;
  productCreated= false;
  ingredientAddedToList= false;
  constructor(private productService: ProductService,
              private ingredientService: IngredientService,
              private router: Router,
              private fb: FormBuilder) {
    this.productGroup = this.fb.group({
      name: [''],
      type: [''],
    });
    this.ingredientGroup = this.fb.group({
      name: [''],
    });
  }


  ngOnInit() {
    this.productService.getProducts()
      .subscribe(
        products => {
          this.products = products;
        }
      );
    this.ingredientService.getIngredients()
      .subscribe(
        ingredients => {
          this.ingredients = ingredients;
        }
      );
  }
  DeleteConfirm(id: number, $event) {
    console.log('product');
    this.productService.deleteProductById(
      id).switchMap(productDeleted => this.productService.getProducts())
      .subscribe(
        products => {
          this.products = products;
          this.confirmDelete = false;
        }, error2 => {}
      );
    $event.stopPropagation();
  }
  delete(product: Product) {
    this.productToDelete = product;
    this.confirmDelete = true;
  }

  abortDelete() {
    this.confirmDelete = false;
    this.productToDelete = null;
  }

  addProduct() {
    const values = this.productGroup.value;
    const product: Product = {
      name: values.name,
      type: values.type,
    };
    this.productService.createProduct(product)
      .subscribe(returnproduct => {
        this.products.push(returnproduct);
        this.productGroup.reset();
        this.productCreated = true;
        setTimeout(() => {
          this.productCreated = false;
        }, 2500);
      });
  }
  addToIngredients() {
    const values = this.ingredientGroup.value;
    const ingredient: Ingredient = {
      name: values.name,
    };
    this.ingredientService.createIngredient(ingredient)
      .subscribe(returnIngredient => {
        this.ingredients.push(returnIngredient);
        this.ingredientGroup.reset();
        this.ingredientAddedToList = true;
        setTimeout(() => {
          this.ingredientAddedToList = false;
        }, 2500);
      });
  }
  editSpecificProduct(id: number) {
    const values2 = this.productGroup.value;
    const product: Product = {
      name: values2.name,
      type: values2.type,
      id: id,
    };
    this.productService.editProduct(id, product)
      .switchMap(productEdited => this.productService.getProducts())
      .subscribe(
        products => {
          this.products = products;
          this.confirmEdit = false;
          this.productGroup.reset();
        }, error2 => {}
      );
  }
  edit(product: Product) {
    this.productToEdit = product;
    this.confirmEdit = true;
  }
  abortEdit() {
    this.productToEdit = null;
    this.confirmEdit = false;
  }

  addIngredientToProduct(name: string, type: string, id: number, idIng: number) {
    this.ingredientIdList.push(idIng);
    const product: Product = {
      name: name,
      type: type,
      ingredientIds: this.ingredientIdList,
      id: id,
    };
    this.productService.editProduct(id, product)
      .switchMap(IngredientEdited => this.productService.getProducts())
      .subscribe(products => {
        this.products = products;
      });
    this.ingredientIdList = [];
  }
  backToLogin() {
    this.router.navigateByUrl('/login');
  }
  closeAlert() {
    this.productCreated = false;
  }

}
