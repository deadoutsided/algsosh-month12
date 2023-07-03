describe('routes are available', function(){
  before(function(){
    cy.visit('/');
  });

  it('pages are available', function(){
    cy.get('[href*="recursion"]').click();
    cy.contains('Строка');
    cy.go('back');

    cy.get('[href*="fibonacci"]').click();
    cy.contains('Последовательность Фибоначчи').should('exist');
    cy.go('back');

    cy.get('[href*="sorting"]').click();
    cy.contains('Сортировка массива');
    cy.go('back');

    cy.get('[href*="stack"]').click();
    cy.contains('Стек');
    cy.go('back');

    cy.get('[href*="queue"]').click();
    cy.contains('Очередь');
    cy.go('back');

    cy.get('[href*="list"]').click();
    cy.contains('Связный список');
    cy.go('back');
  })
})