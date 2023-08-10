import styles from "./index.module.css";
import { TodoItem } from "@/components/TodoItem";
import { prisma } from "@/db";
import { redirect } from "next/navigation";

type Item = {
  userId: number;
  id: string;
  title: string;
  complete: boolean;
};

async function getTodosComplete() {
  return await prisma.todo.findMany({
    where: { completed: { equals: true } },
    orderBy: [{ title: "asc" }],
  });
}

function getTodosIncomplete() {
  return prisma.todo.findMany({
    where: { completed: { equals: false } },
    orderBy: [{ title: "asc" }],
  });
}

async function deleteAll() {
  await prisma.todo.deleteMany({ where: { userId: { equals: "1" } } });
}

async function modifyTodos(data: FormData) {
  "use server";
  await deleteAll();
  const itemsToFetch = data.get("items")?.valueOf();
  if (itemsToFetch === 0) {
    return;
  }
  let dataArray = [];
  let i = 0;
  while (i < itemsToFetch) {
    try {
      let randomId = Math.floor(Math.random() * 1100 + 1);
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${randomId}`
      );
      const datatest = await res.json();
      if ("id" in datatest) {
        await createTodo(datatest);
        i++;
      }
    } catch (error) {
      console.log(error);
    }
  }
  redirect("/");
}

async function createTodo({
  title,
  completed,
}: {
  title: string;
  completed: boolean;
}) {
  "use server";
  await prisma.todo.create({
    data: { title: title, completed: completed, userId: "1" },
  });
}

export default async function Home() {
  const todosComplete = await getTodosComplete();
  const todosIncomplete = await getTodosIncomplete();

  return (
    <div className={styles.mainDiv}>
      <h2 className={styles.title}>DiploAI</h2>
      <div className={styles.descriptionDiv}>
        <p className={styles.descriptionText}>
          DiploAI is a tool that helps companies and governments deal with
          increasing climate complexity and regulatory change, by using GenAI to
          identify their optimal strategy to achieve a given goal. Select a
          number below from 1 to 1100 to view tasks.
        </p>
      </div>
      <div className={styles.listDiv}>
        <form action={modifyTodos} className={styles.form}>
          <input
            type="number"
            name="items"
            min="1"
            max="1100"
            className={styles.input}
          />
          <button type="submit" className={styles.submit}>
            Lookup
          </button>
        </form>

        {todosIncomplete.map((item) => (
          <TodoItem key={item.id} {...item} />
        ))}
        {todosComplete.map((item) => (
          <TodoItem key={item.id} {...item} />
        ))}
      </div>
      <div className={styles.actions}>
        <a className={styles.action}>Action 1</a>
        <a className={styles.action}>Action 2</a>
      </div>
    </div>
  );
}
