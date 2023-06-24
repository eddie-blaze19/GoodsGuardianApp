import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { InvertoryApiService } from 'src/app/services/invertory-api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})

export class SignupComponent {

  constructor(
     private builder: FormBuilder,
     private service: InvertoryApiService,
     private services: AuthService,
     private router: Router,
     private _snackBar: MatSnackBar) {

  }
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  openSnackBar (message: string) {
    this._snackBar.open( message , 'Done', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  registerform = this.builder.group({
    name: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    address: this.builder.control('', Validators.required),
    role: this.builder.control(''),
    isactive: this.builder.control(false)
  });
  proceedregister() {
    if (this.registerform.valid) {
      this.services.RegisterUser(this.registerform.value).subscribe(result => {
        this.openSnackBar ('Registered successfully')
        this.openSnackBar ('Please contact admin for enable access.')

       this.router.navigate(['login'])
      });
    } else {
      this.openSnackBar ('Please enter valid data.')
    }
  }
}
