
let width = window.innerWidth;
let height = window.innerHeight;

let svg = d3.select('svg')
    .attr('width', width)
    .attr('height', height);
let container = svg.append('g');


d3.json('./data/sets.json')
.then(function ([data]) {
    console.log(data);

    // Defining a force that brings all bubbles to the center
    let centerForce = d3.forceCenter()
        .x(width/2)
        .y(height/2)
        .strength(1);

    // Defining the force simulation
    // with 2 forces
    // center and collision (which stops all bubbles from being in the same space)
    let simulation = d3.forceSimulation(data) // binding the force simulation to the data
        .force('center', centerForce)
        .force('collide', d3.forceCollide().radius(50));

    // Adding column groups which will contain all the bubbles for each column
    let columnGroup = container.selectAll('g.column-group')
        .data(data)
        .enter()
        .append('g')
        .classed('column-group', true);

    // adding circles for each column
    columnGroup
        .append('circle')
        .classed('column-circle', true)
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 50);

    // adding semantically similar names
    // using the same data
    columnGroup
        .selectAll('circle.same')
        .data(d => d.sameAs) // using the nested data for nested bubbles
        .enter()
        .append('circle')
        .classed('same', true)
        .attr('transform', (d, i) => `translate(${findPosition(i)})`)
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 10);

    // for every frame on the screen
    // simulation will tick
    simulation.on('tick', () => {
        columnGroup
            .attr('transform', d => `translate(${d.x}, ${d.y})`);
    });

});

// calculating the positions
function findPosition(index) {
    let angle = index * 50; // degrees
    angle = angle * (Math.PI/180); // convert to radians

    // in pixels
    // a simple guassian function
    let distance = index * 4 * Math.pow(6, 1/index);

    // using basic trigonometry
    let x = - Math.sin(angle) * distance;
    let y = Math.cos(angle) * distance;

    return [x, y];
}