import { Injectable } from '@angular/core';

import { SecurityDefinition } from 'src/app/adminSystems/securitySystem/privlegeManagement/security-definition/SecurityDefinition.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TreeTableModule } from 'primeng/treetable';
import { TreeNode } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class SecurityDefinitionService {

  url: string = "http://springdev.ipaedu.sa:8084/getSystemCategories"
  Categories: any[];
  constructor(private http: HttpClient) { }


  getAllCategories(): Observable<any> {
    return this.http.get(this.url)

  }



  postCategories(CategoryId: number): Observable<any> {
    return this.http.post('http://springdev.ipaedu.sa:8084/getSystemsForSysCatId', {
      systemCategoryId: CategoryId

    })

  }



  postSubsystem(systemId: number): Observable<any> {
    return this.http.post('http://springdev.ipaedu.sa:8084/getSubSystemsForSystemId', {
      systemId: systemId

    })

  }


  postSubsystemRole(systemRoleCode: number): Observable<any> {
    return this.http.post('http://springdev.ipaedu.sa:8084/getSystemRolesForSubSystem', {
      subSystemId: systemRoleCode

    })

  }

  postSystemFunctionsRole(systemRoleCode: number): Observable<any> {
    return this.http.post('http://springdev.ipaedu.sa:8084/getSystemFunctionsForRole', {
      systemRoleCode: systemRoleCode

    })

  }


  postFunctionsDsForFunction(systemFunctionId: number): Observable<any> {
    return this.http.post('http://springdev.ipaedu.sa:8084/getFunctionDsForFunctionId', {
      systemFunctionId: systemFunctionId

    })

  }

  //-------------------Update-------------------//
  updateCategories(sysCategoryId: number, sysCategoryAName: string, sysCategoryEName: string, userId: number): Observable<any> {
    return this.http.post('http://springdev.ipaedu.sa:8084/addSystemCategory', {
      sysCategoryId: sysCategoryId,
      sysCategoryAName: sysCategoryAName,
      sysCategoryEName: sysCategoryEName,
      userId: userId
    })

  }

  updateSystem(systemCode: number, systemAName: string, systemEName: string,sysCategoryId:number, userId: number): Observable<any> {
    return this.http.post('http://springdev.ipaedu.sa:8084/addSystemc', {
      systemCode: systemCode,
      systemAName: systemAName,
      systemEName: systemEName,
      sysCategoryId:sysCategoryId,
      userId: userId
    })

  }
  updateSubsystem(subSystemid: number, systemAName: string, systemEName: string,systemCode:number, userId: number): Observable<any> {
    return this.http.post('http://springdev.ipaedu.sa:8084/addSubSystems', {
      subSystemId: subSystemid,
      subSystemAName: systemAName,
      subSystemEName: systemEName,
      systemCode:systemCode,
      userId: userId
    })

  }


  updateSystemRoles(systemRoleCode: number, systemRoleAName: string, systemRoleEName: string,subSystemId:number, userId: number): Observable<any> {
    return this.http.post('http://springdev.ipaedu.sa:8084/addSystemRoles', {
      systemRoleCode: systemRoleCode,
      systemRoleAName: systemRoleAName,
      systemRoleEName: systemRoleEName,
      subSystemId:subSystemId,
      userId: userId
    })

  }
  
  updateSystemFunctions(systemRoleCode: number, systemRoleAName: string, systemRoleEName: string,angularRouteLink:string,icon:string,subSystemId:number, userId: number): Observable<any> {
    return this.http.post('http://springdev.ipaedu.sa:8084/addSystemFunctions', {
      systemFunctionId: systemRoleCode,
      systemFunctionAName: systemRoleAName,
      systemFunctionEName: systemRoleEName,
      angularRouteLink:angularRouteLink,
      icon:icon,
      systemRoleCode:subSystemId,
      userId: userId
    })

  }




  //-------------------Delete-------------------//
  deleteCategories(systemId: number, deleteAction: boolean): Observable<any> {
    return this.http.post('http://springdev.ipaedu.sa:8084/deleteSystemCategory', {
      sysCategoryId: systemId,
      deleteAction: deleteAction = true
    })

  }
  

  deleteSystems(systemCode: number, deleteAction: boolean, usrerID:number): Observable<any> {
    return this.http.post('http://springdev.ipaedu.sa:8084/deleteSystemc', {
      systemCode:systemCode,
      deleteAction: deleteAction = true,
      userId:1
    })

  }

  
  deleteSubSystem(subSystemId: number, deleteAction: boolean, usrerID:number): Observable<any> {
    return this.http.post('http://springdev.ipaedu.sa:8084/deleteSubSystem', {
      subSystemId:subSystemId,
      deleteAction: deleteAction = true,
      userId:1
    })

  }

  //
  deleteSystemRoles(subSystemId: number, deleteAction: boolean, usrerID:number): Observable<any> {
    return this.http.post('http://springdev.ipaedu.sa:8084/deleteSystemRoles', {
      systemRoleCode:subSystemId,
      deleteAction: deleteAction = true,
      userId:1
    })

  }

  //deleteSystemFunction
  deleteSystemFunctions(subSystemId: number, deleteAction: boolean, usrerID:number): Observable<any> {
    return this.http.post('http://springdev.ipaedu.sa:8084/deleteSystemFunction', {
      systemFunctionId:subSystemId,
      deleteAction: deleteAction = true,
      userId:1
    })

  }
}
