
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

    simulation.on('tick', () => {
        columnGroup
            .attr('transform', d => `translate(${d.x}, ${d.y})`);
    });

});