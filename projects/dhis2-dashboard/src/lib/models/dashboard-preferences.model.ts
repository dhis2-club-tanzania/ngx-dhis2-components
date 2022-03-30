export interface DashboardPreferences {
  id: string;
  namespace: string;
  appName: string;
  customAttributes?: string[];
  menuAlignment: string;
  menuType: string;
  selectionFilterConfig?: any;
}
