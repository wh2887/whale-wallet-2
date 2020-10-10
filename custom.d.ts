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

type Result = { title: string; payTotal?: number; incomeTotal?: number; items: RecordItem[] }

type RootState = {
  recordList: RecordItem[];
  tagList: myTag[];
  firstTimeFlag: Boolean
}
