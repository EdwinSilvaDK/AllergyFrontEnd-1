import {Product} from './product.model';
import {Observable} from 'rxjs/observable';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


const url = environment.apiEndpoint + '/product';


@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}
  get(): Observable<Product[]> {
    return this.http
      .get<Product[]>(url);
  }
}
