export class MyDate extends Date {
  constructor(value?: number | string | Date) {
    if (value) super(value);
    super();
  }

  // Adicione um método para converter um timestamp em uma instância MyDate
  static fromTimestamp(timestamp: number): MyDate {
    const date = new MyDate();
    date.setTime(timestamp);
    return date;
  }

  // Adicione um método para obter a data formatada como uma string
  formattedDate(): string {
    const year = this.getFullYear();
    const month = this.getMonth() + 1;
    const day = this.getDate();

    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDay = day < 10 ? `0${day}` : `${day}`;

    return `${year}-${formattedMonth}-${formattedDay}`;
  }
}
