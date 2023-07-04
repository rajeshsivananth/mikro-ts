import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Book } from "./Book";

@Entity()
export class Author {
  @PrimaryKey()
  _id!: number;

  @Property()
  name: string;

  @Property()
  email: string;

  @OneToMany('Book', 'author')
  books = new Collection<Book>(this);

  constructor(name: string, email: string) {
    this.email = email;
    this.name = name;
  }
}
