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
