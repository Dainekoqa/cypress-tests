/// <reference types="cypress" />

describe('API Testing - Cars Management', () => {
    const baseUrl = 'https://qauto.forstudy.space/api';
    let authCookie;
    let createdCarId;

    before(() => {
        cy.request({
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
        cy.request({
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
        cy.request({
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
        cy.request({
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

    it('Should update the added car', () => {
        cy.request({
            method: 'PUT',
            url: `${baseUrl}/cars/${createdCarId}`,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Cookie': authCookie
            },
            body: {
                carBrandId: 1,
                carModelId: 1,
                mileage: 20000
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.status).to.eq('ok');
        });
    });

    it('Should return 404 when updating a non-existent car', () => {
        cy.request({
            method: 'PUT',
            url: `${baseUrl}/cars/999999`,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Cookie': authCookie
            },
            body: {
                carBrandId: 1,
                carModelId: 1,
                mileage: 20000
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body.status).to.eq('error');
        });
    });

    it('Should return 401 when updating a car without authorization', () => {
        cy.request({
            method: 'PUT',
            url: `${baseUrl}/cars/${createdCarId}`,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: {
                carBrandId: 1,
                carModelId: 1,
                mileage: 20000
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
        });
    });

    it('Should delete the added car', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/cars/${createdCarId}`,
            headers: {
                'accept': 'application/json',
                'Cookie': authCookie
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.status).to.eq('ok');
        });
    });

    it('Should return 404 when deleting a non-existent car', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/cars/999999`,
            headers: {
                'accept': 'application/json',
                'Cookie': authCookie
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body.status).to.eq('error');
        });
    });

    it('Should return 401 when deleting a car without authorization', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/cars/${createdCarId}`,
            headers: {
                'accept': 'application/json'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
        });
    });
});
