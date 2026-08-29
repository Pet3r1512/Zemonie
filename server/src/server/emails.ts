import prisma from "@/lib/prisma";
import { authenticatedProcedure, router } from "./tRPC";
import brevo from "@/lib/brevo";

export const emailsRouter = router({
  welcomeEmail: authenticatedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.userId;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        email: true,
        name: true,
      },
    });

    if (!user) throw new Error("User not found");

    const result = await brevo.transactionalEmails.sendTransacEmail({
      sender: {
        name: "Zemonie Team",
        email: "customer.service@zemonie.site",
      },
      to: [
        {
          email: user.email,
          name: user.name,
        },
      ],
      templateId: 1,
    });

    return { success: true, messageId: result.messageId };
  }),
});
