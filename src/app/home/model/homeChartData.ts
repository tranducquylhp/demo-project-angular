export class HomeChartsData {
    public name: string;
    public dataSet: any[];
    public labels: any[];

    constructor(
        name : string,
        dataSet: any[],
        labels : any[]
    )
    {
        this.name = name;
        this.dataSet = dataSet;
        this.labels = labels;
    }
}
