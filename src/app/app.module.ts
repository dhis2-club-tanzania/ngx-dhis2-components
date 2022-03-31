import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDhis2HttpClientModule } from '@iapps/ngx-dhis2-http-client';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxDhis2DataFilterModule } from 'projects/ngx-dhis2-data-filter/src/public-api';
import { NgxDhis2DictionaryModule } from 'projects/ngx-dhis2-dictionary/src/public-api';
import { NgxDhis2MenuModule } from 'projects/ngx-dhis2-menu/src/public-api';
import { NgxDhis2OrgUnitFilterModule } from 'projects/ngx-dhis2-org-unit-filter/src/public-api';
import { NgxDhis2PeriodFilterModule } from 'projects/ngx-dhis2-period-filter/src/public-api';
import { NgxDhis2SelectionFiltersModule } from 'projects/ngx-dhis2-selection-filters/src/public-api';
import { Dhis2DashboardModule } from 'projects/dhis2-dashboard/src/public-api';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { containers } from './containers';
import { MaterialModule } from './material/material.module';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, ...containers],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxDhis2HttpClientModule.forRoot({
      namespace: 'iapps',
      version: 1,
      models: {
        users: 'id',
        organisationUnitLevels: 'id,level',
        organisationUnits: 'id,name,level',
        organisationUnitGroups: 'id',
        dataStore_scorecards: 'id',
      },
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgxDhis2OrgUnitFilterModule,
    NgxDhis2DictionaryModule,
    NgxDhis2MenuModule,
    NgxDhis2PeriodFilterModule,
    NgxDhis2DataFilterModule,
    NgxDhis2SelectionFiltersModule,
    Dhis2DashboardModule,
    StoreModule.forRoot({}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    AppRoutingModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
