import styles from "../app/index.module.css";

type TodoItemProps = {
  id: string;
  title: string;
  completed: boolean;
};

export function TodoItem({ id, title, completed }: TodoItemProps) {
  return (
    <>
      <div className={styles.listItems}>
        <div className={styles.aDiv}>
          <h3 className={styles.a}>A</h3>
        </div>
        <h3 className={styles.listTitle}>{title}</h3>
        <p className={styles.listNumber}>100+</p>
        <input
          className={styles.checkbox}
          type="checkbox"
          defaultChecked={completed}
        />
      </div>
      <div className={styles.lineBreak}></div>
    </>
  );
}
