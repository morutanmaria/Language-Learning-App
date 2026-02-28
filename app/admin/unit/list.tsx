import {Datagrid, List, TextField, TopToolbar,ReferenceField, CreateButton, EditButton,} from "react-admin";

const UnitListActions = () => (
  <TopToolbar>
    <CreateButton />
  </TopToolbar>
);

export const UnitList = (props: any) => {
  return (
    <List {...props} actions={<UnitListActions />}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="description" />
        <ReferenceField source="courseId" reference="courses"/>
        <TextField source="order" />
        <EditButton />
      </Datagrid>
    </List>
  );
};