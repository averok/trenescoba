
export enum CheckState {
  No,
  Maybe,
  Yes,
}

export interface ListItem {
  name: string;
  state: CheckState;
}
