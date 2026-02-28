"use client";

import dynamic from "next/dynamic";

const AdminClient = dynamic(() => import("./admin-client"), { 
  ssr: false,
  loading: () => <p>Loading Admin...</p>
});

export default function AdminWrapper() {
  return <AdminClient />;
}