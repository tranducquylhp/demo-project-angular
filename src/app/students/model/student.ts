export class Student {
    id?:string;
    name:string;
    schoolName: string;
    birthday: Date;

    constructor(id: string, name: string, schoolName:string, birthday: Date) {
        this.id = id;
        this.name = name;
        this.birthday = birthday;
        this.schoolName = schoolName;
    }
}
