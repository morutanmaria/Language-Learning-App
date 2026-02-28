import { SimpleForm, Edit, required, TextInput, ReferenceInput, NumberInput, SelectInput } from "react-admin";

export const ChallengeEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <TextInput source="id" validate={[required()]} label="Id" disabled />
                <TextInput source="question" validate={[required()]} label="Question" />
                
                <SelectInput 
                    source="type" 
                    label="Type"
                    validate={[required()]} 
                    choices={[
                        { id: "SELECT", name: "SELECT" },
                        { id: "ASSIST", name: "ASSIST" },
                    ]} 
                />
                
                <ReferenceInput source="lessonId" reference="lessons">
                    <SelectInput optionText="title" label="Lesson" validate={[required()]} />
                </ReferenceInput>

                <NumberInput source="order" validate={[required()]} label="Order" />
            </SimpleForm>
        </Edit>
    );
};