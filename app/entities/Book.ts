import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";

import { Author } from "./Author";

@Entity()
export class Book {
  @PrimaryKey()
  _id!: number;

  @Property()
  title: string;

  @ManyToOne()
  author!: Author;

  constructor(title: string) {
    this.title = title;
  }
}
