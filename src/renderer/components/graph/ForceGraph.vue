
<template>
    <div id="app">
        <div class="controls">
            <div>
                <label>Adjust width</label>
                <input type="range" v-model="settings.width" min="0" max="200" />
                <input type="checkbox" id="checkbox" v-model="settings.showLable" checked="checked"/>
            </div>
        </div>
        <div class="svg-container" :style="{width: settings.width + '%'}">
            <svg id="svg" pointer-events="all" viewBox="0 0 1200 900" preserveAspectRatio="xMinYMin meet">
                <g :id="links"></g>
                <g :id="nodes"></g>
            </svg>
        </div>
    </div>
</template>
    
<script>
import * as d3 from 'd3'

var input =
{
  'nodes': [
    {
      'id': 1,
      'name': 'java.lang.String',
      size: 5
    },
    {
      'id': 2,
      'name': 'java.lang.Integer',
      size: 14
    },
    {
      'id': 3,
      'name': 'java.lang.Something',
      size: 21
    }
  ],
  'links': [
    {
      'source': 0,
      'target': 1,
      'value': 4
    },
    {
      'source': 1,
      'target': 2,
      'value': 1
    }
  ]
}
export default {
  data: function () {
    return {
      graph: null,
      simulation: null,
      color: function (i) {
        return 'red'
      },
      settings: {
        showLable: true,
        strokeColor: '#29B5FF',
        width: 150,
        svgWigth: 1200,
        svgHeight: 900
      }
    }
  },
  mounted: function () {
    var that = this
    console.log('mounted')
    var graph = input
    //   if (error) throw error
    that.graph = graph
    console.log('json')

    that.simulation = d3.forceSimulation(that.graph.nodes)
      .force('link', d3.forceLink(that.graph.links).distance(function (d) { return d.value * -100 }).strength(0.1))
    //   .force('link', d3.forceLink(that.graph.links).distance(100).strength(0.1))
      .force('charge', d3.forceManyBody().strength(-1000))
      .force('center', d3.forceCenter(that.settings.svgWigth / 2, that.settings.svgHeight / 2))
  },
  computed: {
    nodes: function () {
      var that = this
      if (that.graph) {
        d3.select('svg').selectAll('.nodes').remove()
        var nodes = d3.select('svg').append('g')
          .attr('class', 'nodes')
          .selectAll('.node')
          .attr('stroke', '#fff')
          .attr('stroke-width', 1.5)
          .data(that.graph.nodes)
          .enter().append('g')
          .attr('class', 'node')
        //   .enter().append('circle')
        //   .attr('r', function (d) { return d.size })
        //   .attr('fill', function (d, i) { return that.color(i) })
          .call(d3.drag()
            .on('start', function dragstarted (d) {
              if (!d3.event.active) that.simulation.alphaTarget(0.3).restart()
              d.fx = d.x
              d.fy = d.y
            })
            .on('drag', function dragged (d) {
              d.fx = d3.event.x
              d.fy = d3.event.y
            })
            .on('end', function dragended (d) {
              if (!d3.event.active) that.simulation.alphaTarget(0)
              d.fx = null
              d.fy = null
            }))

        nodes.append('circle')
          .attr('r', 5)
          .attr('r', function (d) { return d.size })
          .attr('fill', function (d) { return that.color(d.id) })

        if (that.settings.showLable) {
          nodes.append('text')
            .text(function (d) {
              return d.name
            })
            .attr('x', 6)
            .attr('y', 3)
        }
      }
      return nodes
    },
    links: function () {
      var that = this
      if (that.graph) {
        return d3.select('svg').append('g')
          .attr('stroke', '#999')
          .attr('stroke-opacity', 0.6)
          .selectAll('line')
          .data(that.graph.links)
          .enter().append('line')
          .attr('stroke-width', d => d.value)
      }
    }

  },
  updated: function () {
    var that = this
    that.simulation.nodes(that.graph.nodes).on('tick', function ticked () {
      that.links
        .attr('x1', function (d) { return d.source.x })
        .attr('y1', function (d) { return d.source.y })
        .attr('x2', function (d) { return d.target.x })
        .attr('y2', function (d) { return d.target.y })

      that.nodes
        // .attr('cx', function (d) { return d.x })
        // .attr('cy', function (d) { return d.y })
        .attr('transform', function (d) { return 'translate(' + d.x + ',' + d.y + ')' })
    })
  }
}
    </script>
<style>
.controls {
            position: fixed;
            top: 16px;
            left: 16px;
            background: #f8f8f8;
            padding: 0.5rem;
            display: flex;
            flex-direction: column;
        }

        .svg-container {
            display: table;
            border: 1px solid #f8f8f8;
            box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);
        }

        .controls>*+* {
            margin-top: 1rem;
        }

        label {
            display: block;
        }

        .links line {
            stroke: #999;
            stroke-opacity: 0.6;
        }

        .nodes circle {
            stroke: #fff;
            stroke-width: 1.5px;
        }
</style>
