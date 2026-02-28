import { Datagrid, List, TextField, TopToolbar, ReferenceField, CreateButton, EditButton, SelectField,} from "react-admin";

const ChallengeListActions = () => (
    <TopToolbar>
        <CreateButton />
    </TopToolbar>
);

export const ChallengeList = (props: any) => {
    return (
        <List {...props} actions={<ChallengeListActions />}>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField source="question" />
                <SelectField source="type" choices={[
                    { id: "SELECT", name: "SELECT" },
                    { id: "ASSIST", name: "ASSIST" },
                ]} />
                <ReferenceField source="lessonId" reference="lessons" />
                <TextField source="order" />
                <EditButton />
            </Datagrid>
        </List>
    );
};