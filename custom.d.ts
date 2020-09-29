type fuck = {
  id: number;
  type: string;
  iconName: string;
  text: string;
}
type RecordItem = {
  type: string;
  tags: fuck[];
  note: string;
  amount: number;
  createdAt?: string;
}
type RootState = {
  recordList: RecordItem[];
  tagList: fuck[];
  currentTag?: fuck;
  // createRecordError: Error | null;
  // monthlyBudget: number;
}
