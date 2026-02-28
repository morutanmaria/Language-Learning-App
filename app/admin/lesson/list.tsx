import {Datagrid, List, TextField, TopToolbar,ReferenceField, CreateButton, EditButton,} from "react-admin";

const LessonListActions = () => (
  <TopToolbar>
    <CreateButton />
  </TopToolbar>
);

export const LessonList = (props: any) => {
  return (
    <List {...props} actions={<LessonListActions />}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="title" />
        <ReferenceField source="unitId" reference="units" />
        <TextField source="order" />
        <EditButton />
      </Datagrid>
    </List>
  );
};