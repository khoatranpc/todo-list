import {
  Button,
  Classes,
  Dialog,
  FormGroup,
  InputGroup,
  Intent,
  Switch,
  TextArea,
} from "@blueprintjs/core";
import "./index.css";
import { todoType } from "../../types/todo.type";
import { useFormik } from "formik";
interface Props {
  visibleDetail: boolean;
  statusModal: boolean;
  dataProp: todoType;
  handleAddTodo: (newTodo: todoType) => any;
  handleDropTodo: (index: number) => void;
  findIndexOfTodo: (title: string) => any;
  handleUpdateTodo: (updateTodo: todoType, indexTodo: number) => void;
  close: () => void;
}
const Modal = (props: Props) => {
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      title: props.dataProp.title,
      description: props.dataProp.description,
      status: props.dataProp.status,
    },
    // validate schema
    onSubmit: async (value) => {
      if (props.statusModal === true) {
        await props.handleAddTodo(value);
      } else {
        const indexOfTodo = await props.findIndexOfTodo(props.dataProp.title);
        await props.handleUpdateTodo(value, indexOfTodo);
      }
      props.close();
    },
  });
  const handleDropTodo = async (title: string) => {
    const indexOfTitle = await props.findIndexOfTodo(title);
    // drop todo
    await props.handleDropTodo(indexOfTitle);
  };
  return (
    <>
      <Dialog
        title="Detail Todo"
        icon="info-sign"
        isOpen={props.visibleDetail}
        onClose={props.close}
      >
        <div className={Classes.DIALOG_BODY}>
          <form onSubmit={handleSubmit}>
            <FormGroup
              label="Title"
              labelFor="title-input"
              labelInfo="(required)"
            >
              <InputGroup
                id="title-input"
                placeholder="Placeholder text"
                name="title"
                onChange={handleChange}
                value={values.title}
              />
            </FormGroup>
            <FormGroup
              label="Description"
              labelFor="description-input"
              labelInfo="(required)"
            >
              <TextArea
                growVertically={true}
                fill={true}
                name="description"
                onChange={handleChange}
                value={values.description}
                intent={Intent.PRIMARY}
              />
            </FormGroup>
            <FormGroup
              label="Status"
              labelFor="text-input"
              labelInfo="(required)"
            >
              <Switch
                checked={values.status}
                label="Status"
                name="status"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup className="btn_footerDetail">
              <Button type="submit">Save</Button>
              <Button
                onClick={() => {
                  handleDropTodo(values.title);
                  props.close();
                }}
              >
                Drop
              </Button>
              <Button
                onClick={() => {
                  props.close();
                }}
              >
                Cancel
              </Button>
            </FormGroup>
          </form>
        </div>
      </Dialog>
    </>
  );
};
export default Modal;
