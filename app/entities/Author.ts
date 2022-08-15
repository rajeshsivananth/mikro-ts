import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Author {
  @PrimaryKey()
  _id!: number;

  @Property()
  name: string;

  @Property()
  email: string;

  constructor(name: string, email: string) {
    this.email = email;
    this.name = name;
  }
}
