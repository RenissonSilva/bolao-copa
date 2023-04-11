import Fastify from "fastify";
import cors from '@fastify/cors'
import jwt from "@fastify/jwt";

import { poolRoutes } from "./routes/poll";
import { userRoutes } from "./routes/user";
import { guessRoutes } from "./routes/guess";
import { authRoutes } from "./routes/auth";
import { gameRoutes } from "./routes/game";

async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    })

    await fastify.register(cors, {
        origin: true //Quando for pra produção é interessante alterar para a url da produção. Ex: www.rocketseat.com.br
    })

    await fastify.register(jwt, {
        secret: 'nlwcopa' //Var de ambiente
    })

    await fastify.register(poolRoutes)
    await fastify.register(userRoutes)
    await fastify.register(guessRoutes)
    await fastify.register(authRoutes)
    await fastify.register(gameRoutes)

    await fastify.listen({ port: 3333, /*host: '0.0.0.0'*/ })
}

bootstrap()