import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

 constructor(private service: AuthService , private router: Router, private _snackBar: MatSnackBar) { }

 horizontalPosition: MatSnackBarHorizontalPosition = 'start';
 verticalPosition: MatSnackBarVerticalPosition = 'bottom';

 openSnackBar (message: string) {
   this._snackBar.open( message , 'Done', {
     horizontalPosition: this.horizontalPosition,
     verticalPosition: this.verticalPosition,
   });
 }

 canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.service.isloggedin()) {
      if (route.url.length > 0) {
        let menu = route.url[0].path;
        if (menu == 'user') {
          if (this.service.getrole() == 'admin') {
            return true;
          } else {
            this.router.navigate(['']);
              this.openSnackBar ('You dont have access.')
            return false;
          }
        }else{
          return true;
        }
      } else {
        return true;
      }
    }
    else {
      this.router.navigate(['login']);
      return false;
    }
  }

}
