import { Datagrid, List, TextField, ReferenceField, BooleanField, EditButton } from "react-admin";

export const ChallengeOptionList = (props: any) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="text" label="Answer Text" />
            <BooleanField source="correct" />
            <ReferenceField source="challengeId" reference="challenges" />
            <TextField source="imageSrc" />
            <TextField source="audioSrc" />
            <EditButton />
        </Datagrid>
    </List>
);