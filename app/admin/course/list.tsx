import {Datagrid, List, TextField, TopToolbar, CreateButton, EditButton,} from "react-admin";

const CourseListActions = () => (
  <TopToolbar>
    <CreateButton />
  </TopToolbar>
);

export const CourseList = (props: any) => {
  return (
    <List {...props} actions={<CourseListActions />}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="imageSrc" />
        <EditButton />
      </Datagrid>
    </List>
  );
};