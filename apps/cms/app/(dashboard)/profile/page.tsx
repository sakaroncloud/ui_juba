import { getSession } from "@/lib/actions/session";
import React from "react";

const ProfilePage = async () => {
  const session = await getSession();
  if (!session) return <div>ProfilePage</div>;
};

export default ProfilePage;
