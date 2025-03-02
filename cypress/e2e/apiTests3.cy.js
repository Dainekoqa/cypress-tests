/// <reference types="cypress" />

describe('API Testing with Plugin', () => {
    const baseUrl = 'https://qauto.forstudy.space/api';
    let authCookie;
    let createdCarId;

    before(() => {
        cy.api({
            method: 'POST',
            url: `${baseUrl}/auth/signin`,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: {
                email: 'irene@gmail.com',
                password: 'Qwerty123',
                remember: false
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.status).to.eq('ok');
            authCookie = response.headers['set-cookie'][0];
        });
    });

    it('Should successfully add a car', () => {
        cy.api({
            method: 'POST',
            url: `${baseUrl}/cars`,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Cookie': authCookie
            },
            body: {
                carBrandId: 1,
                carModelId: 1,
                mileage: 888
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.status).to.eq('ok');
            createdCarId = response.body.data.id;
        });
    });

    it('Should return 400 when adding a car without required fields', () => {
        cy.api({
            method: 'POST',
            url: `${baseUrl}/cars`,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Cookie': authCookie
            },
            body: {},
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.status).to.eq('error');
        });
    });

    it('Should return 401 when adding a car without authorization', () => {
        cy.api({
            method: 'POST',
            url: `${baseUrl}/cars`,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: {
                carBrandId: 1,
                carModelId: 1,
                mileage: 888
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
        });
    });
});
