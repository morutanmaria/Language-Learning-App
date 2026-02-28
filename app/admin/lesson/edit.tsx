import { SimpleForm, required, TextInput, Edit, ReferenceInput, NumberInput } from "react-admin";

export const LessonEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <TextInput source="id" validate={[required()]} label="Id" disabled />
                <TextInput source="title" validate={[required()]} label="Title" />
                <TextInput source="description" validate={[required()]} label="Description" />
                
                <ReferenceInput source="courseId" reference="courses">
                    <TextInput source="courseId" label="Course" validate={[required()]} />
                </ReferenceInput>

                <NumberInput source="order" validate={[required()]} label="Order" />
            </SimpleForm>
        </Edit>
    );
};