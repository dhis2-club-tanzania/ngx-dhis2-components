import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DashboardDescriptionComponent } from './components/dashboard-description/dashboard-description.component';
import { DashboardLoaderComponent } from './components/dashboard-loader/dashboard-loader.component';
import { DashboardMenuItemComponent } from './components/dashboard-menu-item/dashboard-menu-item.component';
import { DashboardMenuListComponent } from './components/dashboard-menu-list/dashboard-menu-list.component';
import { DashboardMenuComponent } from './components/dashboard-menu/dashboard-menu.component';
import { DashboardSelectionSummaryComponent } from './components/dashboard-selection-summary/dashboard-selection-summary.component';
import { DashboardTitleComponent } from './components/dashboard-title/dashboard-title.component';

import { Dhis2DashboardComponent } from './containers/dhis2-dashboard/dhis2-dashboard.component';

import { SummarizeSelectionPipe } from './pipes/summarize-selection.pipe';
import { DashboardItemService } from './services/dashboard-item.service';
import { DashboardService } from './services/dashboard.service';
import { DownloadToExcelService } from './services/download-excel.service';
import { FavoritesService } from './services/favorites.service';

import { materialModules } from './shared/materials.module';
import { DashboardEffects } from './store/effects/dashboard.effects';
import { RouterEffects } from './store/effects/router.effects';
import { SystemInfoEffects } from './store/effects/system-info.effects';
import { UserEffects } from './store/effects/user.effects';
import { dashboardReducer } from './store/reducers/dashboard.reducer';
import { globalFilterReducer } from './store/reducers/global-filter.reducer';
import { systemInfoReducer } from './store/reducers/system-info.reducer';
import { userReducer } from './store/reducers/user.reducer';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    Dhis2DashboardComponent,
    DashboardMenuComponent,
    DashboardDescriptionComponent,
    DashboardMenuItemComponent,
    DashboardMenuListComponent,
    DashboardTitleComponent,
    DashboardSelectionSummaryComponent,
    DashboardLoaderComponent,
    DashboardTitleComponent,
    SummarizeSelectionPipe,
    DashboardComponent,
  ],
  providers: [
    DashboardItemService,
    DashboardService,
    DownloadToExcelService,
    FavoritesService,
  ],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forFeature('dashboardUser', userReducer),
    StoreModule.forFeature('dashboard', dashboardReducer),
    StoreModule.forFeature('systemInfo', systemInfoReducer),
    StoreModule.forFeature('globalFilter', globalFilterReducer),
    EffectsModule.forFeature([
      DashboardEffects,
      UserEffects,
      SystemInfoEffects,
      RouterEffects,
    ]),
    ...materialModules,
  ],
  exports: [Dhis2DashboardComponent, ...materialModules],
})
export class Dhis2DashboardModule {}
