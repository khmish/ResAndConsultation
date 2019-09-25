import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {FunctiontreeserviceService} from '../../../service/data/functiontreeservice.service';
import {
  ErrorMessage,
  SubSystemHttpBody,
  SystemCategoryHttpBody,
  SystemFunctionDsQueryHttpBody,
  SystemFunctionHttpBody,
  SystemHttpBody,
  SystemRoleHttpBody,
  UserPrivilagesHttpBody,
  UserPrivilagesHttpBodyService
} from '../../../service/data/httpBodies/user-privilages-http-body.service';
import {UserAccessService} from '../../../service/user-access.service';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private translate: TranslateService, public router: Router, private userPrivilagesHttpBodyService: UserPrivilagesHttpBodyService,
              public treeService: FunctiontreeserviceService, public userAccessService: UserAccessService) {
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

  isActive: boolean;
  collapsed: boolean;
  showMenu: string;
  pushRightClass: string;

  @Output() collapsedEvent = new EventEmitter<boolean>();

  direction: string;

  userPrivilagesHttpBody: UserPrivilagesHttpBody;

  systemName: string;
  getRequestError: string;
  errorMessage: ErrorMessage;
  systemCategoryHttpBodies: Array<SystemCategoryHttpBody>;
  systems: Array<SystemHttpBody>;
  subSystems: Array<SubSystemHttpBody>;
  systemRoles: Array<SystemRoleHttpBody>;
  systemFunctions: Array<SystemFunctionHttpBody>;

  subSystemsList: any[];

  httpBodies: Array<SystemFunctionDsQueryHttpBody>;

  ngOnInit() {
    this.isActive = false;
    this.collapsed = false;
    this.showMenu = 'roles';
    this.pushRightClass = 'push-right';

    this.treeService.getAllUserRoles().subscribe((response: HttpResponse<any>) => {
      this.userAccessService.setUserPrivilagesHttpBody(response.body);
    });

    this.treeService.getAllUserRoles().subscribe((response: HttpResponse<UserPrivilagesHttpBody>) => {
        // console.log(response.body);
        this.userPrivilagesHttpBody = response.body;
        if (this.userPrivilagesHttpBody !== null) {
          this.errorMessage = this.userPrivilagesHttpBody.errorMessage;
          if (this.errorMessage.errorCode !== '0') {
          } else {
            this.systemCategoryHttpBodies = this.userPrivilagesHttpBody.systemCategoryHttpBodies;
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < this.systemCategoryHttpBodies.length; i++) {
              this.systems = this.systemCategoryHttpBodies[i].systems;
              // tslint:disable-next-line:prefer-for-of
              for (let j = 0; j < this.systems.length; j++) {
                // console.log('4-- inside system: ' + j + 'System code : ' + this.systems[j].systemCode);
                // console.log(this.systems);
                if (this.systems[j].systemCode.toString() === '1') {
                  // console.log('5-- inside system check code: ' + j);
                  this.systemName = this.systems[j].systemAName;
                  // console.log('Hello' + this.systemName);
                  this.subSystems = this.systems[j].subSystemHttpBody;
                  // tslint:disable-next-line:prefer-for-of
                  // for (let k = 0; k < this.subSystems.length; k++) {
                  //   console.log('6-- inside subSystems check code: ' + j);
                  //   // this.subSystemsList[k] = this.subSystems[k];
                  //   console.log(this.subSystems[k].subSystemEName);
                  //   this.systemRoles = this.subSystems[k].systemRoles;
                  //   // tslint:disable-next-line:prefer-for-of
                  //   for (let l = 0; l < this.systemRoles.length; l++) {
                  //     console.log('7-- inside systemRoles check code: ' + j);
                  //     // this.subSystemsList[k] = this.subSystems[k];
                  //     console.log(this.systemRoles[l].systemRoleEName);
                  //     this.systemFunctions = this.systemRoles[l].systemFunctions;
                  //     // tslint:disable-next-line:prefer-for-of
                  //     for (let m = 0; m < this.systemFunctions.length; m++) {
                  //       console.log(this.systemFunctions[m].systemFunctionEName);
                  //     }
                  //   }
                  // }
                  break;
                }
              }
            }
          }
        }
      },
      error => {
        this.getRequestError = error.toString();
      });
    // this.subSystemHttpBodyList = this.layoutComponent.userPrivilagesHttpBody;
    // this.treeService.getAllUserRoles().subscribe((res: HttpResponse<any>) => {
    //   console.log(res.body.systemCategoryHttpBodies[0]);
    //   this.menuTreeList = res.body.systemCategoryHttpBodies[0].systems[0];
    //   this.subSystem = [this.menuTreeList];
    //   console.log(this.menuTreeList);
    //   this.subSystemHttpBodyList = res.body.systemCategoryHttpBodies[0].systems[0].subSystemHttpBody[0];
    //   console.log(this.subSystemHttpBodyList);
    //
  }

  // });

  //   this.userPrivilagesHttpBody = this.userAccessService.getUserPrivilagesHttpBody();
  //   if (this.userPrivilagesHttpBody !== null) {
  //     this.errorMessage = this.userPrivilagesHttpBody.errorMessage;
  //     if (this.errorMessage.errorCode !== '0') {
  //     } else {
  //       this.systemCategoryHttpBodies = this.userPrivilagesHttpBody.systemCategoryHttpBodies;
  //       // tslint:disable-next-line:prefer-for-of
  //       for (let i = 0; i < this.systemCategoryHttpBodies.length; i++) {
  //         this.systems = this.systemCategoryHttpBodies[i].systems;
  //         // tslint:disable-next-line:prefer-for-of
  //         for (let j = 0; j < this.systems.length; j++) {
  //           console.log('4-- inside system: ' + j + 'System code : ' + this.systems[j].systemCode);
  //           console.log(this.systems);
  //           if (this.systems[j].systemCode.toString() === '1') {
  //             console.log('5-- inside system check code: ' + j);
  //             this.systemName = this.systems[j].systemAName;
  //             console.log('Hello' + this.systemName);
  //             this.subSystems = this.systems[j].subSystemHttpBody;
  //             // tslint:disable-next-line:prefer-for-of
  //             // for (let k = 0; k < this.subSystems.length; k++) {
  //             //   console.log('6-- inside subSystems check code: ' + j);
  //             //   // this.subSystemsList[k] = this.subSystems[k];
  //             //   console.log(this.subSystems[k].subSystemEName);
  //             //   this.systemRoles = this.subSystems[k].systemRoles;
  //             //   // tslint:disable-next-line:prefer-for-of
  //             //   for (let l = 0; l < this.systemRoles.length; l++) {
  //             //     console.log('7-- inside systemRoles check code: ' + j);
  //             //     // this.subSystemsList[k] = this.subSystems[k];
  //             //     console.log(this.systemRoles[l].systemRoleEName);
  //             //     this.systemFunctions = this.systemRoles[l].systemFunctions;
  //             //     // tslint:disable-next-line:prefer-for-of
  //             //     for (let m = 0; m < this.systemFunctions.length; m++) {
  //             //       console.log(this.systemFunctions[m].systemFunctionEName);
  //             //     }
  //             //   }
  //             // }
  //             break;
  //           }
  //         }
  //       }
  //     }
  //   }
  // }


  eventCalled() {
    this.isActive = !this.isActive;
  }

  addExpandClass(element: any) {
    console.log(element);
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
    this.collapsedEvent.emit(this.collapsed);
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
    sessionStorage.setItem('authenticatedUser', '');
  }

  storeLocalVariable(systemFunctionDsQueryHttpBody: Array<SystemFunctionDsQueryHttpBody>, angularRouteLink: string) {
    // console.log(this.direction);
    // if (this.direction === 'en') {
    //   this.translate.use('en');
    // } else if (this.direction === 'ar') {
    //   this.translate.use('ar');
    //   this.rlttoLtr();
    // }
    console.log('angularRouteLink ---------> ' + angularRouteLink);
    // console.log('systemFunctionDsQueryHttpBody ---------> ' + systemFunctionDsQueryHttpBody)
    this.userAccessService.setSystemFunctionDsQueryHttpBodies(systemFunctionDsQueryHttpBody);
    this.router.navigate(['/' + angularRouteLink]);
  }

  switchLanguage(lang: string) {
    if (lang === 'en') {
      this.translate.use('en');
      this.direction = 'ltr';
    } else {
      this.translate.use('en');
      this.direction = 'rtl';
    }

  }
}
