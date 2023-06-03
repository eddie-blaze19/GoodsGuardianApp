import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvertoryApiService {
  readonly InvertoryApiUrl = 'https://localhost:7274/api';

  constructor(private http: HttpClient) {}

  //Coupons

  getCouponsList(): Observable<any[]> {
    return this.http.get<any>(this.InvertoryApiUrl + '/Coupons');
  }

  addCoupons(data: any) {
    return this.http.post<any>(this.InvertoryApiUrl + '/Coupons', data);
  }

  updateCoupons(id: number | string, data: any) {
    return this.http.put<any>(this.InvertoryApiUrl + `/Coupons/${id}`, data);
  }

  deleteCoupons(id: number | string) {
    return this.http.delete<any>(this.InvertoryApiUrl + `/Coupons/${id}`);
  }

  //Customers

  getCustomersList(): Observable<any[]> {
    return this.http.get<any>(this.InvertoryApiUrl + '/Customers');
  }

  addCustomers(data: any) {
    return this.http.post<any>(this.InvertoryApiUrl + '/Customers', data);
  }

  updateCustomers(id: number | string, data: any) {
    return this.http.put<any>(this.InvertoryApiUrl + `/Customers/${id}`, data);
  }

  deleteCustomers(id: number | string) {
    return this.http.delete<any>(this.InvertoryApiUrl + `/Customers/${id}`);
  }

  //Products

  getProductsList(): Observable<any[]> {
    return this.http.get<any>(this.InvertoryApiUrl + '/Product');
  }

  addProducts(data: any) {
    return this.http.post<any>(this.InvertoryApiUrl + '/Product', data);
  }

  updateProducts(id: number | string, data: any) {
    return this.http.put<any>(this.InvertoryApiUrl + `/Product/${id}`, data);
  }

  deleteProducts(id: number | string) {
    return this.http.delete<any>(this.InvertoryApiUrl + `/Product/${id}`);
  }
  //Purchases

  getPurchasesList(): Observable<any[]> {
    return this.http.get<any>(this.InvertoryApiUrl + '/Purchases');
  }

  addPurchases(data: any) {
    return this.http.post<any>(this.InvertoryApiUrl + '/Purchases', data);
  }

  updatePurchases(id: number | string, data: any) {
    return this.http.put<any>(this.InvertoryApiUrl + `/Purchases/${id}`, data);
  }

  deletePurchases(id: number | string) {
    return this.http.delete<any>(this.InvertoryApiUrl + `/Purchases/${id}`);
  }
  //Sales

  getSalesList(): Observable<any[]> {
    return this.http.get<any>(this.InvertoryApiUrl + '/Sales');
  }

  addSales(data: any) {
    return this.http.post<any>(this.InvertoryApiUrl + '/Sales', data);
  }

  updateSales(id: number | string, data: any) {
    return this.http.put<any>(this.InvertoryApiUrl + `/Sales/${id}`, data);
  }

  deleteSales(id: number | string) {
    return this.http.delete<any>(this.InvertoryApiUrl + `/Sales/${id}`);
  }
  //Suppliers

  getSuppliersList(): Observable<any[]> {
    return this.http.get<any>(this.InvertoryApiUrl + '/Suppilers');
  }

  addSuppliers(data: any) {
    return this.http.post<any>(this.InvertoryApiUrl + '/Suppilers', data);
  }

  updateSuppliers(id: number | string, data: any) {
    return this.http.put<any>(this.InvertoryApiUrl + `/Suppilers/${id}`, data);
  }

  deleteSuppliers(id: number | string) {
    return this.http.delete<any>(this.InvertoryApiUrl + `/Suppilers/${id}`);
  }



  findProduct(
    productId: number,
    filter = '',
    sortOrder = 'asc',
    pageNumber = 0,
    pageSize = 3
  ): Observable<any[]> {
    {
      return this.http
        .get('/api/product', {
          params: new HttpParams()
            .set('productId', productId.toString())
            .set('filter', filter)
            .set('sortOrder', sortOrder)
            .set('pageNumber', pageNumber.toString())
            .set('pageSize', pageSize.toString()),
        })
        .pipe(map((res: { [x: string]: any; }) => res['payload']));
    }
  }
}
