import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ViewallconsultationserviceService} from '../../../../../service/data/viewallconsultationservice.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultationserviceService {

  constructor(private http: HttpClient, private allConList: ViewallconsultationserviceService) {
  }

  addNewConsultation(orgId1: string,
                     orgNameAr: string,
                     orgNameEn: string,
                     contactName: string,
                     currJob: string,
                     currPhone: string,
                     currEmail: string,
                     resField: string,
                     consultationTitle: string,
                     consultationDesc: string) {

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      observe: 'response' as 'response'
    };

    return this.http.post('http://springdev.ipaedu.sa:8082/setNewRfc', {
      orgId: orgId1,
      rfcTitle: consultationTitle,
      rfcDescription: consultationDesc,
      rfcFieldCode: resField,
      orgArabicName: orgNameAr,
      orgEnglishName: orgNameEn,
      orgContactName: contactName,
      orgContactJob: currJob,
      orgContactPhone: currPhone,
      orgContactEmail: currEmail
    }, httpOptions);
    // this.allConList.getAllRfConsultations();
  }

  getAllOrganizations() {
    return this.http.get('http://springdev.ipaedu.sa:8082/getAllOrganizations')
      .toPromise()
      .then(res => res as any[])
      .then(data => {
        return data;
      });
  }
}
