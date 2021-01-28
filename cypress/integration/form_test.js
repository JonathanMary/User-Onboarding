
describe("Form app", () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });
    const getName = () => cy.get(':nth-child(2) > input');
    const getMail = () => cy.get(':nth-child(4) > input');
    const getPassword = () => cy.get(':nth-child(6) > input');
    const getTos = () => cy.get(':nth-child(8) > input');
    const getButton = () => cy.get('button');

    it('sanity test', () => {
        expect(2+2).to.equal(4);
    })
    it('Get the Name input and type a name in it.', () => {
        getName().type("Jean-Pierre");
    });

    it('Use an assertion to check if the text inputted contains the name you provided (Hint: use the .should assertion)', () => {
        getName().type("Jean-Pierre")
                 .should('have.value', 'Jean-Pierre');
    });
    it('Get the Email input and type an email address in it', () => {
        getMail().type('Jean-Pierre@gmail.com');
    });
    it('Get the password input and type a password in it', () => {
        getPassword().type('123456');
    });
    it('Set up a test that will check to see if a user can check the terms of service box', () => {
        getTos().check()
                .should('be.checked');
    });
    it('Check to see if a user can submit the form data', () => {
        getName().type("Jean-Pierre");
        getMail().type('Jean-Pierre@gmail.com');
        getPassword().type('123456');
        getTos().check();
        getButton().click();
        cy.get('pre').contains('name:Jean-Pierre, email:Jean-Pierre@gmail.com');
    });
    it('Check for form validation if an input is left empty', () => {
        getName().type("Jean-Marie");
        getMail().type('Jean-Marie@gmail.com');
        getPassword().type('123456');
        getButton().click();
        cy.get('pre').should('not.exist'); //doesn't work
    });
});