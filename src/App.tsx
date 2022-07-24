import { useState } from "react";
import "./App.css";
import { ToastNotice } from "./Components/Toast/toast";
import TodoList from "./Components/TodoList";
import Modal from "./Components/TodoList/Modal";
import { todoType } from "./types/todo.type";
let emptyTodo: todoType = {
  title: "",
  description: "",
  status: true,
};

let todo1: todoType = {
  title: "Đi nấu cơm",
  description: "Đong gạo, chan nước bằng 1 đốt ngón tay trỏ",
  status: false,
};
let todo2: todoType = {
  title: "Học bài",
  description: "Học về các phép toán, tính mật độ tình cảm của Crush",
  status: true,
};
let todo3: todoType = {
  title: "Nói chuyện với Vợ",
  description: "Đồ chưa có người yêu mà đòi có vợ =)))))",
  status: false,
};
function App() {
  //
  const [todoList, setTodoList] = useState<todoType[]>([todo1, todo2, todo3]);
  const [visibelModalAdd, setvisibelModalAdd] = useState<boolean>(false);
  const filterData = (todoList: todoType[], title: string) => {
    const filter = todoList.filter((item, index) => {
      if (item.title === title) {
        return item;
      }
    });
    return filter;
  };
  //fnc filter data
  const handleFilterTodo = async (title: string) => {
    const data = await filterData(todoList, title);
    const dataSearch: todoType = data[0];
    return dataSearch;
  };
  //handle open Modal
  const handelModalAdd = (emptyTodo: todoType) => {
    setvisibelModalAdd(!visibelModalAdd);
  };
  // handle add to do
  const handleAddTodo = async (newTodo: todoType) => {
    const existedTodonStatus = todoList.filter((item, index) => {
      if (
        newTodo.title.toLowerCase() == item.title.toLowerCase() &&
        newTodo.status == item.status
      ) {
        return item;
      }
    });
    if (existedTodonStatus.length == 0) {
      setTodoList([...todoList, newTodo]);
    } else {
      ToastNotice("Việc làm có rồi mà chưa xong kìa má!");
    }
  };
  // handleDrop
  const handleDropTodo = async (index: number) => {
    await setTodoList((prev: todoType[]) => {
      prev.splice(index, 1);
      return prev;
    });
  };
  // handle updapte
  const handleUpdateTodo = async (updateTodo: todoType, indexTodo: number) => {
    await setTodoList((prev: todoType[]) => {
      prev.splice(indexTodo, 1, updateTodo);
      return prev;
    });
  };
  return (
    <div className="App">
      <TodoList
        list={todoList}
        handleFilterTodo={handleFilterTodo}
        handelModalAdd={handelModalAdd}
        handleAddTodo={handleAddTodo}
        handleDropTodo={handleDropTodo}
        handleUpdateTodo={handleUpdateTodo}
      />
      {visibelModalAdd ? (
        <Modal
          visibleDetail={visibelModalAdd}
          dataProp={emptyTodo}
          handleAddTodo={handleAddTodo}
          handleDropTodo={() => {}}
          findIndexOfTodo={() => {}}
          handleUpdateTodo={() => {}}
          close={() => {
            setvisibelModalAdd(!visibelModalAdd);
          }}
          statusModal={true}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
