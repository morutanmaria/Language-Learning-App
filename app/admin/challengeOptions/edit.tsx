import { SimpleForm, Create, Edit, TextInput, ReferenceInput, SelectInput, BooleanInput, required } from "react-admin";


export const ChallengeOptionEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="text" validate={[required()]} />
            <BooleanInput source="correct" />
            <ReferenceInput source="challengeId" reference="challenges">
                <SelectInput optionText="question" />
            </ReferenceInput>
            <TextInput source="imageSrc" />
            <TextInput source="audioSrc" />
        </SimpleForm>
    </Edit>
);