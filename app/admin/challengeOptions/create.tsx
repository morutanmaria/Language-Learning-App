import { SimpleForm, Create, Edit, TextInput, ReferenceInput, SelectInput, BooleanInput, required } from "react-admin";

export const ChallengeOptionCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="text" validate={[required()]} label="Text" />
            <BooleanInput source="correct" label="Correct Answer" />
            <ReferenceInput source="challengeId" reference="challenges">
                <SelectInput optionText="question" label="Challenge" validate={[required()]} />
            </ReferenceInput>
            <TextInput source="imageSrc" label="Image URL" />
            <TextInput source="audioSrc" label="Audio URL" />
        </SimpleForm>
    </Create>
);
