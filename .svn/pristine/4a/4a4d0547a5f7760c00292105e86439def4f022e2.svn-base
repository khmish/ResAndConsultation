import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {
  EmployeeInfosResponseHttpBody,
  ErrorMessage,
  SystemCategoryHttpBody,
  SystemHttpBody,
  UserPrivilagesHttpBody
} from '../../../service/data/httpBodies/user-privilages-http-body.service';
import {FunctiontreeserviceService} from '../../../service/data/functiontreeservice.service';
import {HttpResponse} from '@angular/common/http';
import {UserAccessService} from '../../../service/user-access.service';
import {SidebarComponent} from '../sidebar/sidebar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public pushRightClass: string;

  window: any;
  userPrivilagesHttpBody: UserPrivilagesHttpBody;
  systemName: string;
  getRequestError: string;
  errorMessage: ErrorMessage;
  systemCategoryHttpBodies: Array<SystemCategoryHttpBody>;
  systems: Array<SystemHttpBody>;
  globalLanguage: string;
  direction: string;

  employeeInfosResponseHttpBody: EmployeeInfosResponseHttpBody;

  employeeName: string;

  // tslint:disable-next-line:max-line-length
  constructor(private translate: TranslateService, public router: Router, public treeService: FunctiontreeserviceService, public userAccessService: UserAccessService,
              private sideBar: SidebarComponent) {

    this.router.events.subscribe(val => {
      if (
        val instanceof NavigationEnd &&
        window.innerWidth <= 992 &&
        this.isToggled()
      ) {
        this.toggleSidebar();
      }
    });
  }

  ngOnInit() {
    sessionStorage.setItem('language', 'ar');
    this.globalLanguage = 'ar';
    this.pushRightClass = 'push-right';

    // console.log('ITS FROM HEADER');

    this.treeService.getAllUserRoles().subscribe((response: HttpResponse<any>) => {
      this.userAccessService.setUserPrivilagesHttpBody(response.body);
    });


    this.treeService.getAllUserRoles().subscribe((response: HttpResponse<UserPrivilagesHttpBody>) => {
        console.log(response.body);
        this.userPrivilagesHttpBody = response.body;
        // console.log('0-- Before');
        if (this.userPrivilagesHttpBody !== null) {
          // console.log('1-- Is not null');
          // console.log(this.userPrivilagesHttpBody);
          this.errorMessage = this.userPrivilagesHttpBody.errorMessage;
          if (this.errorMessage.errorCode !== '0') {
            console.log(this.errorMessage.errorADescription);
          } else {
            // console.log('2-- No error');
            this.systemCategoryHttpBodies = this.userPrivilagesHttpBody.systemCategoryHttpBodies;
            this.employeeInfosResponseHttpBody = this.userPrivilagesHttpBody.employeeInfosResponseHttpBody;
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < this.systemCategoryHttpBodies.length; i++) {
              // console.log('3-- inside syscat: ' + i);
              this.systems = this.systemCategoryHttpBodies[i].systems;
              // tslint:disable-next-line:prefer-for-of
              for (let j = 0; j < this.systems.length; j++) {
                // console.log('4-- inside system: ' + j + 'System code : ' + this.systems[j].systemCode );
                // console.log(this.systems);
                if (this.systems[j].systemCode.toString() === '1') {
                  // console.log('5-- inside system check code: ' + j);
                  this.systemName = this.systems[j].systemAName;
                  // console.log('Hello' + this.systemName);
                  break;
                }
              }
            }

            if (this.employeeInfosResponseHttpBody.errorMessage.errorCode === '0') {
              this.employeeName = this.employeeInfosResponseHttpBody.arabicFirstName + ' ' + this.employeeInfosResponseHttpBody.arabicFamilyName;;
            }
          }
        }
      },
      error => {
        this.getRequestError = error.toString();
      });

    // this.userPrivilagesHttpBody = response.body;
    // this.userPrivilagesHttpBody = this.userAccessService.getUserPrivilagesHttpBody();
    // console.log(this.userPrivilagesHttpBody.systemCategoryHttpBodies.length);
    // console.log('0-- Before');
    // if (this.userPrivilagesHttpBody !== null) {
    //   console.log('1-- Is not null');
    //   console.log(this.userPrivilagesHttpBody);
    //   this.errorMessage = this.userPrivilagesHttpBody.errorMessage;
    //   if (this.errorMessage.errorCode !== '0') {
    //     console.log(this.errorMessage.errorADescription);
    //   } else {
    //     console.log('2-- No error');
    //     this.systemCategoryHttpBodies = this.userPrivilagesHttpBody.systemCategoryHttpBodies;
    //     // tslint:disable-next-line:prefer-for-of
    //     for (let i = 0; i < this.systemCategoryHttpBodies.length; i++) {
    //       console.log('3-- inside syscat: ' + i);
    //       this.systems = this.systemCategoryHttpBodies[i].systems;
    //       // tslint:disable-next-line:prefer-for-of
    //       for (let j = 0; j < this.systems.length; j++) {
    //         console.log('4-- inside system: ' + j + 'System code : ' + this.systems[j].systemCode);
    //         console.log(this.systems);
    //         if (this.systems[j].systemCode.toString() === '1') {
    //           console.log('5-- inside system check code: ' + j);
    //           this.systemName = this.systems[j].systemAName;
    //           console.log('Hello' + this.systemName);
    //           break;
    //         }
    //       }
    //     }
    //
    //   }
    // }

    // Loop throw privilages to find the system
  }

  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  onLoggedout() {
    localStorage.removeItem('isLoggedin');
  }

  changeToEnglish() {
    this.translate.use('en');
    this.globalLanguage = 'en';
    this.direction = 'ltr';
    this.sideBar.switchLanguage('en');
  }

  changeToArabic() {
    this.translate.use('ar');
    this.globalLanguage = 'ar';
    this.direction = 'rtl';
    this.sideBar.switchLanguage('ar');
  }
}
