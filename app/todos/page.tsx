"use client";

import { Toggle } from "@/components/tailgrids/core/toggle";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/tailgrids/core/native-select";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
} from "@/components/tailgrids/core/table";

import { Pagination } from "@/components/tailgrids/core/pagination";
import { Spinner } from "@/components/tailgrids/core/spinner";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/tailgrids/core/dialog";
import { Input } from "@/components/tailgrids/core/input";
import { Label } from "@/components/tailgrids/core/label";
import { Backdrop, OverlayWrapper } from "@/components/tailgrids/core/overlay";
import { TextArea } from "@/components/tailgrids/core/text-area";
import { TextField } from "@/components/tailgrids/core/text-field";
import { useEffect, useState } from "react";
import { Check, ClockThree, Plus, Trash1 } from "@tailgrids/icons";
import { Button } from "@/components/tailgrids/core/button";
import { Badge } from "@/components/tailgrids/core/badge";
import { fetchTodos } from "../data/todos";
import type { TodoType, Todo } from "../data/todos";
import { Tree } from "react-aria-components";
import next from "next";
export default function Page() {
  const [isLoading, setIsloding] = useState(true);
  const [todosRaw, setTodosRaw] = useState<TodoType[]>([]);
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [onlyWaiting, setOnlyWaiting] = useState(false);
  const [itemsPerPage, setItemPerPage] = useState<number>(5);
  // const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [showDialog, setShowDialog] = useState<boolean>(false);

  // useEffect(() => {
  //   const _todoRawStr = localStorage.getItem("todosRaw");
  //   if (_todoRawStr === null) {
  //     setTodosRaw([])
  //   } else {
  //     setTodosRaw(JSON.parse(_todoRawStr) as Todo[])
  //   }
  //   setIsloding(false)
  // }, [])

  // useEffect(() => {
  //   try {
  //     const todoRawStr = localStorage.getItem("todosRaw");

  //     if (todoRawStr === null) {
  //       // setTodosRaw([]);
  //       fetchTodos()
  //       .then(data => setTodosRaw(data as Todo[]))
  //       .catch(() => setTodosRaw([]))
  //       .finally(() => setIsloding(false))

  //     } else {
  //       setTodosRaw(JSON.parse(todoRawStr) as TodoType[]);
  //     }
  //   } catch (error) {
  //     console.error("Error parsing todosRaw:", error);
  //     setTodosRaw([]);
  //   } finally {
  //     setIsloding(false);
  //   }
  // }, []);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todoRawStr = localStorage.getItem("todosRaw");

        if (todoRawStr !== null) {
          const savedTodos = JSON.parse(todoRawStr) as TodoType[];

          if (savedTodos.length > 0) {
            setTodosRaw(savedTodos);
            return;
          }
        }

        const data = await fetchTodos();
        setTodosRaw(data as TodoType[]);
      } catch (error) {
        console.error("Failed to load todos:", error);
        setTodosRaw([]);
      } finally {
        setIsloding(false);
      }
    };

    loadTodos();
  }, []);

  //beeee
  // useEffect(() => {
  //   localStorage.setItem('todosRaw', JSON.stringify(todosRaw));
  // }, [todosRaw]);

  useEffect(() => {
    if (isLoading) return;

    localStorage.setItem("todosRaw", JSON.stringify(todosRaw));
  }, [todosRaw, isLoading]);

  //onload
  // useEffect(() => {
  //   fetchTodos()
  //     .then((data) => setTodosRaw(data as TodoType[]))
  //     .catch((error) => setTodosRaw([]))
  //     .finally(() => setIsloding(false));
  // }, []);

  useEffect(() => {
    // console.log(todosRaw)

    if (onlyWaiting)
      setTodos(todosRaw.filter((todo) => todo.completed === false));
    else {
      setTodos(todosRaw);
    }
  }, [todosRaw, onlyWaiting]);

  // itemsPerPage => [] => totalPages
  useEffect(() => {
    // console.log(itemsPerPage)
    //13 / 5 = 2.6
    setTotalPages(Math.ceil(todos.length / itemsPerPage));
  }, [todos, itemsPerPage]);

  //totalPages => [] => currentPage
  useEffect(() => {
    if (totalPages > 0) {
      if (currentPage < 0) setCurrentPage(1);
      else if (currentPage > totalPages) setCurrentPage(totalPages);
    }
  }, [totalPages]);

  //delete
  const deleteTodo = (id: number) => {
    setTodosRaw(todosRaw.filter((todo) => todo.id !== id));
  };

  //makedone
  const makeDone = (id: number) => {
    // console.log('make todo done...')

    const selected = todosRaw.find((todo) => {
      return todo.id === id;
    });

    selected!.completed = true;
    console.log(selected);
    //update state
    setTodosRaw([...todosRaw]);
  };

  //addtodo
  //   const addtodo = () => {
  //   const idDom = document.getElementById('id') as HTMLInputElement
  //   const titleDom = document.getElementById('title') as HTMLInputElement
  //   const newTodo: Todo = {
  //     userId: 1,
  //     id: Number(idDom.value),
  //     title: titleDom.value.trim(),
  //     completed: false
  //   }
  //   // add todo raw
  //   setTodosRaw([ ... todosRaw, newTodo])
  //  }

  const addtodo = () => {
    const titleDom = document.getElementById("title") as HTMLInputElement;
    //validate
    const titleStr = titleDom.value.trim();
    if (titleStr === "") return;

    //new td
    const newTodo: Todo = {
      userId: 1,
      id: todosRaw.reduce((p, t) => (t.id > p ? t.id : p), 0) + 1,
      title: titleDom.value.trim(),
      completed: false,
    };

    //add
    setTodosRaw([...todosRaw, newTodo]);
  };

  return (
    // todos container
    <>
      <div className="mt-4 px-2 max-w-3xl mx-auto">
        {/* controller */}
        <div className="flex justify-between">
          {/* toggle */}
          <div className="flex items-center">
            <Toggle
              label="Show only "
              checked={onlyWaiting}
              onChange={(e) => setOnlyWaiting(e.target.checked)}
            />
            &nbsp;
            <Button
              size="sm"
              className="h-8 p-2 bg-yellow-500 pointer-events-none"
            >
              Waiting
              <ClockThree />
            </Button>
          </div>

          {/* dropdown */}
          <div className="w-2/5">
            <NativeSelect
              value={itemsPerPage}
              onChange={(e) => setItemPerPage(Number(e.target.value))}
            >
              <NativeSelectOption value="5">
                5 items per page
              </NativeSelectOption>
              <NativeSelectOption value="10">
                10 items per page
              </NativeSelectOption>
              <NativeSelectOption value="50">
                50 items per page
              </NativeSelectOption>
            </NativeSelect>
          </div>
        </div>
        {/* table */}
        <div className="mt-1">
          <TableRoot>
            <TableHeader>
              <TableRow className="bg-black text-white">
                <TableHead className="w-24 font-bold text-right">ID</TableHead>
                <TableHead className="font-bold text-center">Title</TableHead>
                <TableHead className="font-bold flex justify-end items-center gap-1">
                  Completed
                  <Button
                    size="sm"
                    variant={"primary"}
                    className="h-8 p-2"
                    onClick={() => setShowDialog(true)}
                  >
                    <Plus />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {/* spiner */}
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <Spinner className="mx-auto" />
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && todos.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-red-500">
                    No data, may be connection refused [reload again]
                  </TableCell>
                </TableRow>
              )}

              {/* render data */}
              {todos
                // .filter((todo, index) => {
                //   const lower = (currentPage - 1) * itemsPerPage;
                //   const upper = currentPage * itemsPerPage - 1;
                //   return todo.id >= lower && index <= upper;
                // })

                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage,
                )

                .map((todo) => {
                  return (
                    <TableRow key={todo.id}>
                      <TableCell className="text-right">
                        <Badge
                          size={"lg"}
                          className="rounded-lg bg-gray-500 text-white font-bold"
                        >
                          {todo.id}
                        </Badge>
                      </TableCell>
                      <TableCell>{todo.title}</TableCell>
                      <TableCell className="flex justify-end gap-1">
                        {todo.completed ? (
                          <Button
                            size="sm"
                            className="h-8 bg-green-700 text-white pointer-events-none"
                          >
                            Done
                            <Check />
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            className="h-8 bg-yellow-500 hover:bg-yellow-700
                hover:text-yellow-200 p-2"
                            onClick={() => makeDone(todo.id)}
                          >
                            Waiting
                            <ClockThree />
                          </Button>
                        )}
                        <Button
                          variant="danger"
                          className="h-8 p-2"
                          onClick={() => deleteTodo(todo.id)}
                        >
                          <Trash1 />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}

              {/* completed = false */}
              {/* <TableRow >
              <TableCell className="text-right">
              <Badge
                size={'lg'}
                className='rounded-lg bg-gray-500 text-white font-bold'>
                  12
                </Badge>
                </TableCell>
              <TableCell >Lorem ipsum color.</TableCell>
              <TableCell className="flex justify-end gap-1">
                <Button
                size='sm'
                className='h-8 bg-yellow-500 hover:bg-yellow-700
                hover:text-yellow-200 p-2'
                >
                  Waiting
                  <ClockThree/>
                </Button>
                <Button variant='danger' className='h-8 p-2'>
                <Trash1/>
              </Button>
                </TableCell>
            </TableRow> */}

              {/* completed = true */}
              {/* <TableRow >
              <TableCell>
                <Badge
                size={'lg'}
                className='rounded-lg bg-gray-500 text-white font-bold'>
                  1234
                </Badge>
              </TableCell>
              <TableCell >Lorem ipsum color.</TableCell>
              <TableCell className="flex justify-end gap-1">
              <Button
              size='sm'
              className='h-8 bg-green-700 text-white pointer-events-non'
              >
                Done
                <Check/>
              </Button>
              <Button variant='danger' className='h-8 p-2'>
                <Trash1/>
              </Button>
              </TableCell>
            </TableRow> */}
            </TableBody>
          </TableRoot>
        </div>
        {/* pagination */}
        {todos.length > 0 && (
          <div className="mt-1 w-1/3 mx-auto flex justify-center items-center gap-1">
            <Button
              size="sm"
              appearance="outline"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              First
            </Button>
            <div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
                sideLayout="icon"
              />
            </div>
            <Button
              size="sm"
              appearance="outline"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </Button>
          </div>
        )}
      </div>

      <Backdrop isOpen={showDialog} onOpenChange={setShowDialog}>
        <Dialog>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Plus className="bg-blue-100 rounded-md" size={32} />
              New todo
            </DialogTitle>
          </DialogHeader>

          <DialogBody>
            <form className="flex flex-col gap-4">
              <TextField className="flex flex-col gap-1.5">
                <Label className="font-bold">ID(auto)</Label>
                <Input
                  className="w-full pointer-events-none bg-gray-10 text-gray-400"
                  value={
                    todosRaw.reduce((p, t) => (t.id > p ? t.id : p), 0) + 1
                  }
                />
              </TextField>

              <TextField className="flex flex-col gap-1.5">
                <Label className="font-bold">Title</Label>
                <Input
                  autoFocus
                  placeholder="ใส่งานที่ต้องการเพิ่ม"
                  className="w-full"
                  id="title"
                />
              </TextField>
            </form>
          </DialogBody>

          <DialogFooter>
            <DialogClose appearance="outline">Cancel</DialogClose>
            <DialogClose onClick={addtodo}>Add todo</DialogClose>
          </DialogFooter>
        </Dialog>
      </Backdrop>
    </>
  );
}
