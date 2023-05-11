export interface MenuModel {
  title: string;
  type: "COLLECTION" | "PAGE";
  url: string;
  resourceId: string;
  items: MenuModel[]
}
