/// <reference types="cypress" />

import RegistrationPage from '../pageObjects/RegistrationPage';
import LoginPage from '../pageObjects/LoginPage';

describe('User Registration and Login', () => {
    const baseUrl = 'https://qauto.forstudy.space/';
    const email = `testuser+${Date.now()}@example.com`;
    const password = 'Test1234';

    beforeEach(() => {
        cy.visit(baseUrl, {
            auth: {
                username: 'guest',
                password: 'welcome2qauto',
            },
        });
    });

    it('Registers a new user, logs out, and logs in successfully', () => {
        // Открываем форму регистрации
        cy.contains('button', 'Sign up').click();
        
        // Заполняем форму регистрации
        RegistrationPage.fillRegistrationForm('Test', 'User', email, password, password);

        // Отправляем форму регистрации
        cy.intercept('POST', '**/api/auth/signup').as('signupRequest');
        cy.contains('button', 'Register').click();
        cy.wait('@signupRequest');

        // Проверяем редирект в панель управления
        cy.url().should('include', '/panel/garage');

        // Выход из аккаунта
        cy.contains('a', 'Log out').click();

        // Проверяем, что попали обратно на страницу логина
        cy.url().should('eq', baseUrl);

        // Вход в аккаунт
        cy.contains('button', 'Sign In').click();
        LoginPage.login(email, password);

        // Проверяем успешный вход
        cy.url().should('include', '/panel/garage');
    });
});
