type Tag = {
  id: number;
  type: string;
  iconName: string;
  text: string;
}
type RecordItem = {
  type: string;
  tags: Tag[];
  note: string;
  amount: number;
  createdAt?: string;
}
type RootState = {
  recordList: RecordItem[];
  // createRecordError: Error | null;
  // monthlyBudget: number;
  // tagList: Tag[];
  // currentTag?: Tag;
}
