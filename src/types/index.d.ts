export type Todo = { id: string; title: string; done: boolean };

export type Command = "done" | "update" | "delete";

export type DoneData = { id: string };
export type DeleteDate = { id: string };

export type UpdateData = { id: string; title: string };

export type DataMap = {
  done: DoneData;
  update: UpdateData;
  delete: DeleteDate;
};
