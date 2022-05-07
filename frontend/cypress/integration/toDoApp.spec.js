describe("To Do app", function () {

  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.contains("design");
    cy.contains("design frontend");
  });

  it("state can be changed by clicking", function () {
    cy.contains("design").click();
  });

  it("controling the database", function () {
    const preClick = cy.request('GET', 'http://localhost:3001/api/tasks/')[5]
    cy.request('PUT', 'http://localhost:3001/api/tasks/5')
    cy.visit('http://localhost:3000')
    cy.contains("design").click();
    const postClicked = cy.request('GET', 'http://localhost:3001/api/tasks/')[5]
    firstClick !== secondClicked
    
    

  })
});


