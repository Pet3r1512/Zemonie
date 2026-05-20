import { auth } from "@/lib/auth";

export const createContext = (opts: { req: Request; resHeaders: Headers }) => {
    return {
        req: opts.req,
        resHeaders: opts.resHeaders,
        auth,
    };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
