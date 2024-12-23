import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder} from '@angular/forms'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatDialog } from '@angular/material/dialog';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component'
import { AuthService } from 'src/app/services/auth.service';
import { RemoveComponent } from '../remove/remove.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent  implements AfterViewInit {

    constructor(private builder: FormBuilder,
                private service: AuthService,
                private dialog: MatDialog) {
      this.LoadUser();
    }
    userlist: any;
    dataSource: any;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    ngAfterViewInit(): void {

    }
    LoadUser() {
      this.service.Getall().subscribe(res => {
        this.userlist = res;
        this.dataSource = new MatTableDataSource(this.userlist);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
    displayedColumns: string[] = ['username', 'name', 'email', 'status', 'role', 'action'];

    updateuser(code: any) {
      this.OpenDialog('100ms', '60ms', code);
    }

    OpenDialog(enteranimation: any, exitanimation: any, code: string) {
      const popup = this.dialog.open(UpdatepopupComponent, {
        enterAnimationDuration: enteranimation,
        exitAnimationDuration: exitanimation,
        width: '30%',
        data: {
          usercode: code
        }
      });
      popup.afterClosed().subscribe(res => {
        this.LoadUser();
      });
    }

    removeuser(code: any) {
      this.openDialog('100ms', '60ms', code);
    }

    openDialog(enteranimation: any, exitanimation: any, code: string) {
      const popup = this.dialog.open(RemoveComponent, {
        enterAnimationDuration: enteranimation,
        exitAnimationDuration: exitanimation,
        width: '30%',
        data: {
          usercode: code
        }
      });
      popup.afterClosed().subscribe(res => {
        this.LoadUser();
      });
    }


  }
