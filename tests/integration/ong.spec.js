const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Ongs', () => {
	beforeEach(async () => {
		await connection.migrate.rollback();
		await connection.migrate.latest();
	});

	afterAll(async () => {
		await connection.destroy();
	});

	it('Should be able to create a new ong', async () => {
		const response = await request(app)
			.post('/ongs')
			.send({
				name: 'ong1',
				email: 'ong1@gmail.com',
				whatsapp: '1231231231',
				city: 'florianópolis',
				uf: 'SC'
			});

		expect(response.body).toHaveProperty('id');
		expect(response.body.id).toHaveLength(8);
	});
});
