import { auth } from "@clerk/nextjs/server";

const ADMIN_ID = "user_37wC78T6RQiwZZr3glZqCdBZZnR";

export const getIsAdmin = async () => {
    const { userId } = await auth();
    return userId === ADMIN_ID;
};
