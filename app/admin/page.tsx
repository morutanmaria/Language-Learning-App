import { redirect } from "next/navigation";
import { getIsAdmin } from "@/lib/auth";
import AdminWrapper from "./admin-wrapper";


const AdminPage = async () => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) {
    redirect("/"); 
  }

  return <AdminWrapper />;
};

export default AdminPage;