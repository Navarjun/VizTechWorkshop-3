
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

    let columnGroup = container.selectAll('g.column-group')
        .data(data)
        .enter()
        .append('g')
        .classed('column-group', true);

    columnGroup
        .append('circle')
        .classed('column-circle', true)
        .attr('cx', (d, i) => i * 100)
        .attr('cy', 0)
        .attr('r', 50);

});
