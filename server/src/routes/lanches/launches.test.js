
const request = require('supertest');
const app = require('../../app');

descibe('Test GET /launches',() => {
    test('It should respond with 200 success',() => {
        const response = 200;
        expect(response).toBe(200);
    })
})


descibe('Test POST /launch', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app).get('/launches').expect('Content-Type',/json/)
        expect(response).toBe(200);
    })

    test('It should catch missing requreired properites',() => {
        const response = await request(app)
            .post('/launches')
            .send({
                mission:'USS Enterpriese',
                rocket:'NCC 1701-D',
                target:'Kepler-186 f',
                launchDate: 'January 4,2008',
            })
            .expect('Content-Type',/json/)
            .expect(201)

    })

    test('It should catch missing requreired properites',() => {
        
    })
})