import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

interface SidenavToggle{
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
  animations: [
    trigger('fadeInOut',[
      transition(':enter',[
        style ({opacity: 0}),
        animate('350ms',
        style({opacity: 1})
        )
      ]),
      transition(':leave',[
        style ({opacity: 1}),
        animate('350ms',
        style({opacity: 0})
        )
      ])
    ]),
    trigger('rotate',[
      transition(':enter', [
        animate('1000ms',
           keyframes([
          style({Transform: 'rotate(0deg)', offset: '0'}),
          style({Transform: 'rotate(2turn)', offset: '1'})
          ])
       )
    ]),
      transition(':enter',[
        style ({opacity: 0}),
        animate('350ms',
        style({opacity: 1})
        )
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<SidenavToggle> = new EventEmitter();
  collapsed = true;
  screenWidth = 0;
  navData= navbarData;
@HostListener('window:resize', ['$event'])
OnResize(event: any){
  this.screenWidth = window.innerWidth;
  if(this.screenWidth <= 768){
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

}
  ngOnInit(): void {
       this.screenWidth = window.innerWidth;
  }

  toggleCollapse(): void{
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void{
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
}

