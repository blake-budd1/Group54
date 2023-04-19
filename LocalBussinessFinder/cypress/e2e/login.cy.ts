describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})
describe('Displays error message from register', () => {
  it('Shows Preview', () => {
    cy.viewport(1800,800);
    cy.visit('/');
    //go to register
    cy.contains('Sign').click();
    cy.get('#email').type('cypress2@gmail.com');
    cy.get('#username').type('cypress2');
    cy.get(':nth-child(3) > #Password').type('cypress2');
    cy.get(':nth-child(4) > #Password').type('cypress2');
    cy.get('.submit').click();
    cy.get('.button > .mdc-button__label').click();
  })
})
describe('Displays error message from register then navigates to login', () => {
  it('Shows Preview', () => {
    cy.viewport(1800,800);
    cy.visit('/');
    //go to register
    cy.contains('Sign').click();
    cy.get('#email').type('cypress2@gmail.com');
    cy.get('#username').type('cypress2');
    cy.get(':nth-child(3) > #Password').type('cypress2');
    cy.get(':nth-child(4) > #Password').type('cypress2');
    cy.get('.submit').click();
    cy.get('.button > .mdc-button__label').click();
    cy.get('.forgot > a').click();
  })
})
describe('Displays error message from login with bad credentials', () => {
  it('Shows Preview', () => {
    cy.viewport(1800,800);
    cy.visit('/');
    //go to register
    cy.contains('Login').click();
    cy.get('#username').type('zzz');
    cy.get('#Password').type('zzz');
    cy.get('.submit').click();
    cy.get('.button > .mdc-button__label').click();
  })
})
describe('Login', () => {
  it('Shows Preview', () => {
    cy.viewport(1800,800);
    cy.visit('/');
    //go to register
    cy.contains('Login').click();
    cy.get('#username').type('cypress2');
    cy.get('#Password').type('cypress2');
    cy.get('.submit').click();
    cy.get('.un > a').contains("Hello cypress2!");
    cy.get('.mdc-button--raised > .mdc-button__label').click();
  })
})
describe('Login', () => {
  it('Shows Preview', () => {
    cy.viewport(1800,800);
    cy.visit('/');
    //go to register
    cy.contains('Login').click();
    cy.get('#username').type('cypress3');
    cy.get('#Password').type('cypress3');
    cy.get('.submit').click();
    cy.get('.un > a').contains("Hello cypress3!");
    cy.get('.mdc-button--raised > .mdc-button__label').click();
  })
})
describe('Login', () => {
  it('Shows Preview', () => {
    cy.viewport(1800,800);
    cy.visit('/');
    //go to register
    cy.contains('Login').click();
    cy.get('#username').type('cypress4');
    cy.get('#Password').type('cypress4');
    cy.get('.submit').click();
    cy.get('.un > a').contains("Hello cypress4!");
    cy.get('.mdc-button--raised > .mdc-button__label').click();
  })
})
describe('Login', () => {
  it('Shows Preview', () => {
    cy.viewport(1800,800);
    cy.visit('/');
    //go to register
    cy.contains('Login').click();
    cy.get('#username').type('cypress5');
    cy.get('#Password').type('cypress5');
    cy.get('.submit').click();
    cy.get('.un > a').contains("Hello cypress5!");
    cy.get('.mdc-button--raised > .mdc-button__label').click();
  })
})
describe('Login', () => {
  it('Shows Preview', () => {
    cy.viewport(1800,800);
    cy.visit('/');
    //go to register
    cy.contains('Login').click();
    cy.get('#username').type('cypress6');
    cy.get('#Password').type('cypress6');
    cy.get('.submit').click();
    cy.get('.un > a').contains("Hello cypress6!");
    cy.get('.mdc-button--raised > .mdc-button__label').click();
  })
})
describe('Login', () => {
  it('Shows Preview', () => {
    cy.viewport(1800,800);
    cy.visit('/');
    //go to register
    cy.contains('Login').click();
    cy.get('#username').type('cypress7');
    cy.get('#Password').type('cypress7');
    cy.get('.submit').click();
    cy.get('.un > a').contains("Hello cypress7!");
    cy.get('.mdc-button--raised > .mdc-button__label').click();
  })
})
describe('Login', () => {
  it('Shows Preview', () => {
    cy.viewport(1800,800);
    cy.visit('/');
    //go to register
    cy.contains('Login').click();
    cy.get('#username').type('cypress8');
    cy.get('#Password').type('cypress8');
    cy.get('.submit').click();
    cy.get('.un > a').contains("Hello cypress8!");
    cy.get('.mdc-button--raised > .mdc-button__label').click();
  })
})
describe('Login', () => {
  it('Shows Preview', () => {
    cy.viewport(1800,800);
    cy.visit('/');
    //go to register
    cy.contains('Login').click();
    cy.get('#username').type('cypress9');
    cy.get('#Password').type('cypress9');
    cy.get('.submit').click();
    cy.get('.un > a').contains("Hello cypress9!");
    cy.get('.mdc-button--raised > .mdc-button__label').click();
  })
})
describe('Login', () => {
  it('Shows Preview', () => {
    cy.viewport(1800,800);
    cy.visit('/');
    //go to register
    cy.contains('Login').click();
    cy.get('#username').type('cypress10');
    cy.get('#Password').type('cypress10');
    cy.get('.submit').click();
    cy.get('.un > a').contains("Hello cypress10!");
    cy.get('.mdc-button--raised > .mdc-button__label').click();
  })
})
describe('Login', () => {
  it('Shows Preview', () => {
    cy.viewport(1800,800);
    cy.visit('/');
    //go to register
    cy.contains('Login').click();
    cy.get('#username').type('cypress11');
    cy.get('#Password').type('cypress11');
    cy.get('.submit').click();
    cy.get('.un > a').contains("Hello cypress11!");
    cy.get('.mdc-button--raised > .mdc-button__label').click();
  })
})
describe('Login', () => {
  it('Shows Preview', () => {
    cy.viewport(1800,800);
    cy.visit('/');
    //go to register
    cy.contains('Login').click();
    cy.get('#username').type('cypress12');
    cy.get('#Password').type('cypress12');
    cy.get('.submit').click();
    cy.get('.un > a').contains("Hello cypress12!");
    cy.get('.mdc-button--raised > .mdc-button__label').click();
  })
})
describe('Login', () => {
  it('Shows Preview', () => {
    cy.viewport(1800,800);
    cy.visit('/');
    //go to register
    cy.contains('Login').click();
    cy.get('#username').type('cypress13');
    cy.get('#Password').type('cypress13');
    cy.get('.submit').click();
    cy.get('.un > a').contains("Hello cypress13!");
    cy.get('.mdc-button--raised > .mdc-button__label').click();
  })
})
describe('Login', () => {
  it('Shows Preview', () => {
    cy.viewport(1800,800);
    cy.visit('/');
    //go to register
    cy.contains('Login').click();
    cy.get('#username').type('cypress14');
    cy.get('#Password').type('cypress14');
    cy.get('.submit').click();
    cy.get('.un > a').contains("Hello cypress14!");
    cy.get('.mdc-button--raised > .mdc-button__label').click();
  })
})
describe('Login', () => {
  it('Shows Preview', () => {
    cy.viewport(1800,800);
    cy.visit('/');
    //go to register
    cy.contains('Login').click();
    cy.get('#username').type('cypress15');
    cy.get('#Password').type('cypress15');
    cy.get('.submit').click();
    cy.get('.un > a').contains("Hello cypress15!");
    cy.get('.mdc-button--raised > .mdc-button__label').click();
  })
})
describe('Login', () => {
  it('Shows Preview', () => {
    cy.viewport(1800,800);
    cy.visit('/');
    //go to register
    cy.contains('Login').click();
    cy.get('#username').type('cypress16');
    cy.get('#Password').type('cypress16');
    cy.get('.submit').click();
    cy.get('.un > a').contains("Hello cypress16!");
    cy.get('.mdc-button--raised > .mdc-button__label').click();
  })
})
describe('Login', () => {
  it('Shows Preview', () => {
    cy.viewport(1800,800);
    cy.visit('/');
    //go to register
    cy.contains('Login').click();
    cy.get('#username').type('cypress17');
    cy.get('#Password').type('cypress17');
    cy.get('.submit').click();
    cy.get('.un > a').contains("Hello cypress17!");
    cy.get('.mdc-button--raised > .mdc-button__label').click();
  })
})
describe('Login', () => {
  it('Shows Preview', () => {
    cy.viewport(1800,800);
    cy.visit('/');
    //go to register
    cy.contains('Login').click();
    cy.get('#username').type('cypress18');
    cy.get('#Password').type('cypress18');
    cy.get('.submit').click();
    cy.get('.un > a').contains("Hello cypress18!");
    cy.get('.mdc-button--raised > .mdc-button__label').click();
  })
})
describe('Login', () => {
  it('Shows Preview', () => {
    cy.viewport(1800,800);
    cy.visit('/');
    //go to register
    cy.contains('Login').click();
    cy.get('#username').type('cypress19');
    cy.get('#Password').type('cypress19');
    cy.get('.submit').click();
    cy.get('.un > a').contains("Hello cypress19!");
    cy.get('.mdc-button--raised > .mdc-button__label').click();
  })
})
describe('Login', () => {
  it('Shows Preview', () => {
    cy.viewport(1800,800);
    cy.visit('/');
    //go to register
    cy.contains('Login').click();
    cy.get('#username').type('cypress20');
    cy.get('#Password').type('cypress20');
    cy.get('.submit').click();
    cy.get('.un > a').contains("Hello cypress20!");
    cy.get('.mdc-button--raised > .mdc-button__label').click();
  })
})