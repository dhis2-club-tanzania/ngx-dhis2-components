/* tslint:disable:no-unused-variable */

import { of } from 'rxjs';
import { DataStoreService } from './data-store.service';

describe('DataStoreService', () => {
  let httpClientSpy: {
    get: jasmine.Spy;
    post: jasmine.Spy;
    put: jasmine.Spy;
    me: jasmine.Spy;
  };

  let manifestSpy: {
    getManifest: jasmine.Spy;
  };

  let systemInfoSpy: {
    get: jasmine.Spy;
    post: jasmine.Spy;
    put: jasmine.Spy;
    me: jasmine.Spy;
  };

  let indexDbSpy: {
    get: jasmine.Spy;
    post: jasmine.Spy;
    put: jasmine.Spy;
    me: jasmine.Spy;
  };

  let userSpy: {
    getCurrentUser: jasmine.Spy;
  };

  let dataStoreSpy: {
    get: jasmine.Spy;
  };

  let dataStoreService: DataStoreService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('NgxHttpClientService', [
      'get',
      'post',
      'put',
      'me',
    ]);

    manifestSpy = jasmine.createSpyObj('ManifestService', ['getManifest']);
    systemInfoSpy = jasmine.createSpyObj('SytemInfoService', ['get']);
    indexDbSpy = jasmine.createSpyObj('IndexDbService', [
      'findById',
      'findAll',
      'saveOne',
      'saveBulk',
    ]);
    userSpy = jasmine.createSpyObj('UserService', ['getCurrentUser']);
    dataStoreSpy = jasmine.createSpyObj('DataStoreService', ['get']);

    // httpClientSpy.get.and.returnValue(of({}));
    // systemInfoSpy.get.and.returnValue(of({}));
    // manifestSpy.getManifest.and.returnValue(of({}));
    // userSpy.getCurrentUser.and.returnValue(of({}));
    dataStoreService = new DataStoreService(httpClientSpy as any);
  });

  it('should create an data store service instance', () => {
    expect(dataStoreService).toBeDefined();
  });

  it('should return datastore results for the given namespace', async () => {
    const dataStoreUrl = 'dataStore/dataStoreNamespace';
    const expectedResult: any = {
      dataStoreNamespace: [],
    };

    httpClientSpy.get.and.returnValue(of([]));
    const dataStoreResult = await dataStoreService
      .get(dataStoreUrl, {})
      .toPromise();

    expect(dataStoreResult).toEqual(expectedResult);
  });

  it('should return datastore results for the given namespace and provided key', async () => {
    const dataStoreUrl = 'dataStore/dataStoreNamespace/datastoreKey';
    const expectedResult: any = {
      id: 'datastoreKey',
      name: 'dateStoreName',
    };

    httpClientSpy.get.and.returnValue(of(expectedResult));
    const dataStoreResult = await dataStoreService
      .get(dataStoreUrl, {})
      .toPromise();

    expect(dataStoreResult).toEqual(expectedResult);
  });
});
