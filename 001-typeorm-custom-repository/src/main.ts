import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SpelunkerModule } from 'nestjs-spelunker';
import * as util from 'util';
import { AppService } from './app.service';

async function bootstrap() {
  const appDeps = await SpelunkerModule.debug(AppModule);
  const app = await NestFactory.create(AppModule);
  console.log(app.select(AppModule).get(AppService).getHello());

  console.log(util.inspect(appDeps, true, 10));
  const edges = [];
  appDeps.map((topModule) => {
    const { imports, providers, controllers, exports, name } = topModule;
    if (name === 'TypeOrmCoreModule') {
      imports.map((module) => {
        edges.push(`  ${name}-->|imports| Module:${module}`);
      });

      providers.map((provider) => {
        edges.push(
          `  ${name}-->|provide| ${provider.type.toUpperCase()}:${
            provider.name
          }`,
        );
        if (provider.dependencies.length > 0) {
          provider.dependencies.map((dep) => {
            edges.push(
              `  ${provider.type.toUpperCase()}:${
                provider.name
              }-->|depends| ${dep}`,
            );
          });
        }
      });

      controllers.map((controller) => {
        edges.push(`  ${name}--> ${controller.name}`);
        if (controller.dependencies.length > 0) {
          controller.dependencies.map((dep) => {
            edges.push(`  ${controller.name}-->|depends| ${dep}`);
          });
        }
      });

      exports.map((p) => {
        edges.push(`  ${name}-->|exports| ${p.type}${p.name}`);
      });
    }
  });
  // const edges = SpelunkerModule.findGraphEdges(
  //   SpelunkerModule.graph(appDeps as any),
  // );
  console.log('graph LR');

  console.log(edges.join('\n'));

  await app.listen(3000);
}
bootstrap();
