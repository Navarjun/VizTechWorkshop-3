
let width = window.innerWidth;
let height = window.innerHeight;

let svg = d3.select('svg')
    .attr('width', width)
    .attr('height', height);
let container = svg.append('g');


Promise.all([
    d3.json('./data/sets.json')
])
.then(function ([data]) {
    console.log(data);

    let centerForce = d3.forceCenter()
        .x(width/2)
        .y(height/2)
        .strength(1);

    let simulation = d3.forceSimulation(data)
        .force('charge', d3.forceManyBody().distanceMin(10).distanceMax(40).strength(0.4))
        .force('center', centerForce)
        .force('collide', d3.forceCollide().radius(50));

    let columnGroup = container.selectAll('g.column-group')
        .data(data)
        .enter()
        .append('g')
        .classed('column-group', true);

    columnGroup
        .append('circle')
        .classed('column-circle', true)
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 50);

    columnGroup
        .selectAll('circle.same')
        .data(d => d.sameAs)
        .enter()
        .append('circle')
        .classed('same', true)
        .attr('transform', (d, i) => `translate(${findPosition(i)})`)
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 10);

    simulation.on('tick', () => {
        columnGroup
            .attr('transform', d => `translate(${d.x}, ${d.y})`);
    });

});

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