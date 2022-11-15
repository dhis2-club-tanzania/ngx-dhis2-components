/**
 * Copyright (C) 2019 Rajab Mkomwa
 *
 * ngx-dhis2-selecton-filters-module is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ngx-dhis2-selecton-filters-module is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ngx-dhis2-selecton-filters-module. If not, see <http://www.gnu.org/licenses/>.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgxDhis2DataFilterModule } from '@iapps/ngx-dhis2-data-filter';
import { NgxDhis2OrgUnitFilterModule } from '@iapps/ngx-dhis2-org-unit-filter';
import { NgxDhis2PeriodFilterModule } from '@iapps/ngx-dhis2-period-filter';
import { NgxDhis2ValidationRuleFilterModule } from '@iapps/ngx-dhis2-validation-rule-group-filter';
import { TranslateModule } from '@ngx-translate/core';
import { SelectionDialogComponent } from './components/selection-dialog/selection-dialog.component';
import { NgxDhis2SelectionFiltersComponent } from './containers/ngx-dhis2-selection-filters/ngx-dhis2-selection-filters.component';
import { SummarizeSelectionPipe } from './pipes/summarize-selection.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule.forChild(),
        NgxDhis2OrgUnitFilterModule,
        NgxDhis2DataFilterModule,
        NgxDhis2PeriodFilterModule,
        NgxDhis2ValidationRuleFilterModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatIconModule,
        MatTooltipModule,
        MatTabsModule,
    ],
    declarations: [
        NgxDhis2SelectionFiltersComponent,
        SummarizeSelectionPipe,
        SelectionDialogComponent,
    ],
    exports: [NgxDhis2SelectionFiltersComponent]
})
export class NgxDhis2SelectionFiltersModule {}
