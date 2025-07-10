import { serve } from "inngest";
import { inngest, syncUserCreation, syncUserDeletion, syncUserUpdation } from "@/config/inngest";

export const { GET, POST, PUT } = serve({
  client: inngest,
  function: [
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion,
  ],
});
