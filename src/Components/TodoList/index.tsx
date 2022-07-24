import React from "react";
import { Card, Classes, FormGroup, H5, InputGroup } from "@blueprintjs/core";
import "./index.css";
import { todoType } from "../../types/todo.type";
import Modal from "./Modal";
//
interface Props {
  list: todoType[];
  handleFilterTodo: (title: string) => any;
  handelModalAdd: (emptyTodo: todoType) => void;
  handleAddTodo: (newTodo: todoType) => any;
  handleDropTodo: (index: number) => void;
  handleUpdateTodo: (updateTodo: todoType, indexTodo: number) => void;
}
interface State {
  visibleDetail: boolean;
  dataPropsDetail: todoType;
  searchQuery: string;
}
class TodoList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      visibleDetail: false,
      dataPropsDetail: {
        title: "",
        description: "",
        status: false,
      },
      searchQuery: "",
    };
  }
  // filter data
  filterTodo = async (title: string) => {
    const dataSearch = await this.props.handleFilterTodo(title);
    await this.setState({
      visibleDetail: !this.state.visibleDetail,
      dataPropsDetail: dataSearch,
    });
  }; //handle
  handleTypeForSearch = async (title: string) => {
    this.setState({ searchQuery: title });
  };
  handleDetail = async (e: any) => {
    await this.filterTodo(e.target.classList.value);
  };
  // find index todo

  findIndexTodo = (title: string) => {
    const indexOfTitle = this.props.list.findIndex((item) => {
      return (
        item.title.toLowerCase().trim() == title.toLocaleLowerCase().trim()
      );
    });
    return indexOfTitle;
  };
  render(): React.ReactNode {
    return (
      <>
        <Card className={Classes.ELEVATION_3} interactive={true}>
          <H5 className="headerForm">
            Todo List APP
            <button
              onClick={() => {
                this.props.handelModalAdd({
                  title: "",
                  description: "",
                  status: true,
                });
              }}
            >
              add
            </button>
          </H5>
          <FormGroup labelFor="text-input" className="itemList">
            <InputGroup
              type="search"
              readOnly={false}
              fill={true}
              onChange={async (e) => {
                await this.handleTypeForSearch(e.target.value);
              }}
              placeholder="Type to search..."
            />
          </FormGroup>
          {this.props.list
            .filter((item) =>
              item.title
                .toLocaleLowerCase()
                .includes(this.state.searchQuery.toLocaleLowerCase())
            )
            .map((item, index) => {
              return (
                <FormGroup
                  labelFor="text-input"
                  key={item.title}
                  className="itemList"
                >
                  <InputGroup readOnly={true} value={item.title} />
                  <button className={item.title} onClick={this.handleDetail}>
                    Detail
                  </button>
                </FormGroup>
              );
            })}
        </Card>
        {/* mouted & unmouted */}
        {this.state.visibleDetail ? (
          <Modal
            visibleDetail={this.state.visibleDetail}
            dataProp={this.state.dataPropsDetail}
            handleAddTodo={() => {}}
            handleDropTodo={this.props.handleDropTodo}
            findIndexOfTodo={this.findIndexTodo}
            statusModal={false}
            handleUpdateTodo={this.props.handleUpdateTodo}
            close={() => {
              this.setState({ visibleDetail: false });
            }}
          />
        ) : (
          <></>
        )}
      </>
    );
  }
}
export default TodoList;
