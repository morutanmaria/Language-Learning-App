import { SimpleForm, Create, Edit, TextInput, ReferenceInput, NumberInput, SelectInput, required } from "react-admin";

export const LessonCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" validate={[required()]} label="Title" />
      <ReferenceInput source="unitId" reference="units">
        <SelectInput optionText="title" label="Unit" validate={[required()]} />
      </ReferenceInput>
      <NumberInput source="order" validate={[required()]} label="Order" />
    </SimpleForm>
  </Create>
);