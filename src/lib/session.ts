import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

const getCurrentUser = async () => {
    const session = await getServerSession(authOptions);

    console.log("Session:", session);

    return session?.user || null;
}
export default getCurrentUser;