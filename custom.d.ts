type myTag = {
  id: number;
  type: string;
  iconName: string;
  text: string;
}
type RecordItem = {
  type: string;
  tags: myTag[];
  note: string;
  amount: number;
  createdAt?: string;
}
type RootState = {
  recordList: RecordItem[];
  tagList: myTag[];
  currentTag?: myTag;
  currentTagDB?: myTag[];
  currentTagList?: myTag[]
  // createRecordError: Error | null;
  // monthlyBudget: number;
}
