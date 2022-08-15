import express from "express";
import { MikroORM, RequestContext } from "@mikro-orm/core";
import { Book } from "./entities/Book";
import { Author } from "./entities/Author";

const app = express();

async function main() {
  const orm = await MikroORM.init({
    type: "mysql",
    entities: [Book, Author],
    user: "root",
    password: "root",
    dbName: "mikro-test",
    debug: true,
  });

  app.use(express.json());
  app.use((req, res, next) => {
    RequestContext.create(orm.em, next);
  });

  app.post("/api/books", async (req, res) => {
    const body = req.body;
    const book = await orm.em.create(Book, body);
    await orm.em.persist(book).flush();
    res.json(book);
  });
  app.get("/api/books", async (req, res) => {
    const em = orm.em;
    const bookRepo = orm.em.getRepository(Book);
    const books = await bookRepo.findAll();
    res.json(books);
  });
  app.get("/api/books/:id", async (req, res) => {
    const em = orm.em;
    const bookRepo = orm.em.getRepository(Book);
    const book = await bookRepo.findOne(req.params.id);
    res.json(book);
  });
  app.put("/api/books/:id", async (req, res) => {
    const em = orm.em;
    const bookRepo = orm.em.getRepository(Book);
    const book = await bookRepo.findOne(req.params.id);
    if (book) {
      book.title = req.body.title;
    }
    await em.flush();
    res.json(book);
  });
  app.get("/", async (req, res) => {
    res.json({ message: "All good!" });
  });
  app.listen(3131, () => {
    console.log("server is up and running on port 3131");
  });
}

main();
