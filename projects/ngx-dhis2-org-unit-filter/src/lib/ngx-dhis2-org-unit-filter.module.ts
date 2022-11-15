import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxDhis2OrgUnitLevelGroupComponent } from './components/ngx-dhis2-org-unit-level-group/ngx-dhis2-org-unit-level-group.component';
import { NgxDhis2OrgUnitProgressComponent } from './components/ngx-dhis2-org-unit-progress/ngx-dhis2-org-unit-progress.component';
import { NgxDhis2OrgUnitSelectedOrgUnitComponent } from './components/ngx-dhis2-org-unit-selected-org-unit/ngx-dhis2-org-unit-selected-org-unit.component';
import { NgxDhis2OrgUnitSelectionLoadingComponent } from './components/ngx-dhis2-org-unit-selection-loading/ngx-dhis2-org-unit-selection-loading.component';
import { NgxDhis2OrgUnitSelectionComponent } from './components/ngx-dhis2-org-unit-selection/ngx-dhis2-org-unit-selection.component';
import { NgxDhis2OrgUnitTreeItemComponent } from './components/ngx-dhis2-org-unit-tree-item/ngx-dhis2-org-unit-tree-item.component';
import { NgxDhis2UserOrgUnitSelectionComponent } from './components/ngx-dhis2-user-org-unit-selection/ngx-dhis2-user-org-unit-selection.component';
import { NgxDhis2OrgUnitFilterComponent } from './containers/ngx-dhis2-org-unit-filter/ngx-dhis2-org-unit-filter.component';
import { FilterByOrgUnitGroupLevelPipe } from './pipes/org-unit-group-level-filter.pipe';
import { WithOrgUnitLoadingPipe } from './pipes/with-org-unit-loading.pipe';
import { OrgUnitGroupService } from './services/org-unit-group.service';
import { OrgUnitLevelService } from './services/org-unit-level.service';
import { OrgUnitService } from './services/org-unit.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatOptionModule,
  ],
  declarations: [
    NgxDhis2OrgUnitFilterComponent,
    NgxDhis2OrgUnitSelectionComponent,
    NgxDhis2UserOrgUnitSelectionComponent,
    NgxDhis2OrgUnitLevelGroupComponent,
    NgxDhis2OrgUnitSelectedOrgUnitComponent,
    NgxDhis2OrgUnitTreeItemComponent,
    NgxDhis2OrgUnitProgressComponent,
    FilterByOrgUnitGroupLevelPipe,
    WithOrgUnitLoadingPipe,
    NgxDhis2OrgUnitSelectionLoadingComponent,
  ],
  providers: [OrgUnitService, OrgUnitGroupService, OrgUnitLevelService],
  exports: [NgxDhis2OrgUnitFilterComponent],
})
export class NgxDhis2OrgUnitFilterModule {}
