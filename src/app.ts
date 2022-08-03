import fastifyPassport, { Strategy } from "@fastify/passport";
import Fastify, { FastifyRequest } from "fastify";

class CustomStrategy extends Strategy {
  authenticate(request: FastifyRequest, options?: any): void | Promise<void> {
    return this.fail({ message: 'Authentication has failed!' }, 401);
  }
}

const start = async() => {
  fastifyPassport.use('jwt', new CustomStrategy('JWT'));

  const fastify = Fastify({ logger: true });

  try {
    await fastify.register(fastifyPassport.initialize());
    await fastify.register(fastifyPassport.secureSession());

    fastify.get('/', async(request, reply) => {
      return { hello: 'world!' };
    });

    await fastify.listen({ port: 3000 });
  } catch(error) {
      console.error(error);
  }
};

start();