
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
});