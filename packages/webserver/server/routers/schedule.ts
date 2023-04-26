import { procedure, router } from "../trpc";

import { app } from "./app";
import { bookASlotPayloadSchema } from "@camilab/core/src/schedule/commands/BookASlot";

export const scheduleRouter = router({
  bookASlot: procedure.input(bookASlotPayloadSchema).mutation(({ input }) => {
    return app.run({
      type: "Book a slot",
      payload: input,
    });
  }),
});
