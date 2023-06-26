import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  title = 'backpic';
  appimage: string = "assets/background-image.jpg"

  constructor(
    private builder: FormBuilder,
    private _snackBar: MatSnackBar,
    private services: AuthService,
    private router: Router) {
      sessionStorage.clear();

  }
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  openSnackBar(message: string) {
    this._snackBar.open( message , 'Done', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  result: any;
  userlist: any;


  loginform = this.builder.group({
    name: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });

  proceedlogin() {
    if (this.loginform.valid) {
      this.services.GetUserbyCode(this.loginform.value.name).subscribe(item => {
        this.result = item;
        if (this.result.password === this.loginform.value.password) {
          if (this.result.isactive) {
            sessionStorage.setItem('username',this.result.name);
            sessionStorage.setItem('role',this.result.role);
            this.router.navigate(['']);
          } else {
            this.openSnackBar('Please contact Admin ==> InActive User');
          }
        } else {
          this.openSnackBar('Invalid credentials');
        }
      });
    } else {
      this.openSnackBar('Please enter valid data.')
    }
   }

}


