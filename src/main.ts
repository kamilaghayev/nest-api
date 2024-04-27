import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
	const PORT = process.env.PORT || 5000;
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle('Nest API')
		.setDescription('Documentation REST API with swagger')
		.setVersion('1.0.0')
		.addTag('Kamil nest api')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('/api/docs', app, document);

	app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

start()