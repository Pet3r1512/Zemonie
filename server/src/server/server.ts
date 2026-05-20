import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./_index";
import { createContext } from "./context";

export default {
    async fetch(request: Request) {
        const origin = request.headers.get('Origin');
        const resHeaders = new Headers();

        if (origin) {
            resHeaders.set('Access-Control-Allow-Origin', origin);
            resHeaders.set('Access-Control-Allow-Credentials', 'true');
            resHeaders.set(
                'Access-Control-Allow-Headers',
                'Content-Type, Authorization'
            );
            resHeaders.set(
                'Access-Control-Allow-Methods',
                'GET, POST, OPTIONS'
            );
        }

        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: resHeaders, status: 204 });
        }

        return fetchRequestHandler({
            endpoint: '/trpc',
            req: request,
            router: appRouter,
            createContext: () => createContext({ req: request, resHeaders }),
            responseMeta() {
                return { headers: resHeaders };
            },
        });
    },
};
