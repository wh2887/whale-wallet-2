type myTag = {
  id: number;
  type: string;
  iconName: string;
  text: string;
}
type RecordItem = {
  type: string;
  tags: myTag;
  note: string;
  amount: number;
  createdAt?: string;
}
type RootState = {
  recordList: RecordItem[];
  tagList: myTag[];
}
type Result = { title: string; payTotal?: number; incomeTotal?: number; items: RecordItem[] }[]
