import { TestBed } from '@angular/core/testing';
import { HelperService } from './helper.service';
import { DataService } from '../data/data.service';
import { HttpClientModule } from '@angular/common/http';
import { mockData } from './helper.service.spec.data';
import { of, throwError } from 'rxjs';

describe('HelperService', () => {
  let service: HelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [DataService]
    });
    service = TestBed.get(HelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getQuestionsetList should call dataService.post', () => {
    const dataService = TestBed.get(DataService);
    spyOn(dataService, 'post').and.returnValue(of(mockData.questionsetListResponse));
    spyOn(service, 'getQuestionsetList').and.callThrough();
    const req = {
      request: {
        filters: {
          objectType: 'Questionset'
        }
      }
    };
    service.getQuestionsetList(req);
    expect(dataService.post).toHaveBeenCalled();
  });

  it('#createContent() should call actionService.post', () => {
    const dataService = TestBed.get(DataService);
    spyOn(dataService, 'post').and.returnValue(mockData.questionsetCreateResponse);
    spyOn(service, 'createContent').and.callThrough();
    service.createContent(mockData.questionsetCreateRequest);
    expect(dataService.post).toHaveBeenCalled();
  });

});