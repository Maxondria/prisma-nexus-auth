import { server } from '../src/server';
import { prisma } from '../src/utils/helpers';

type Config = { url: string };

export const getConfig = () => {
  let config: any = {};

  beforeAll(async (done) => {
    const { url } = await server.listen({ port: 0 });
    config.url = url;
    done();
  });

  afterAll(async (done) => {
    await server.stop();
    await prisma.$disconnect();
    done();
  });

  return config as Config;
};
