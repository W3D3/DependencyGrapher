<!-- eslint-disable camelcase -->
<template>
  <div id="graph">
    <div class="controls">

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Settings</span>
        </div>

        <div class="setting">
          <label>Labels</label>
          <el-checkbox v-model="settings.showLabel">Show node label</el-checkbox>
        </div>

        <div class="setting">
          <label>Tightness</label>
          <el-slider v-model="settings.tightness"></el-slider>
        </div>

        <div class="setting">
          <!-- <label>Stroke Color</label>
          <el-color-picker v-model="settings.strokeColor"></el-color-picker> -->
          <label>Node Color</label>
          <el-color-picker v-model="settings.defaultNodeColor"></el-color-picker>
        </div>

        <div class="setting">
          <el-button v-on:click="restartSimulation">Restart Simulation</el-button> 
        </div>
        <div class="setting">
          <el-button v-on:click="stopSimulation" type="warning">Stop Simulation</el-button>
        </div>
         <el-divider></el-divider>

        <router-link to="/">
            <el-button>Back to Import</el-button>
          </router-link>
      </el-card>

    </div>
    <!-- <div class="bottom" id="gitGraph" >
      <div class="bot-item" /> 
      <el-card class="box-card bot-item">
        Hi
      </el-card>

    </div> -->
    <div class="svg-container" :style="{width: settings.width + '%'}">
      <!-- <svg id="svg" pointer-events="all" viewBox="0 0 1200 900" preserveAspectRatio="xMinYMin meet">
        <g :id="links"></g>
        <g :id="nodes"></g>
      </svg> -->
      <!-- <SvgPanZoom 
        style="width: 500px; height: 500px; border:1px solid black;"
        :zoomEnabled="true"
        :controlIconsEnabled="true"
        :fit="true"
        :center="false"
    > -->
        <svg id="svg" pointer-events="all" preserveAspectRatio="xMinYMin meet">
          <g class="all">
            <g :id="links"></g>
            <g :id="nodes"></g>
          </g>
      </svg>
    <!-- </SvgPanZoom>` -->
    </div>
  </div>
</template>
<!-- eslint-disable -->
<script>

import * as d3 from 'd3'
// import { createGitgraph, Orientation } from '@gitgraph/js'

export default {
  props: {
    wsdata: Object
  },
  data: function () {
    return {
      graph: null,
      simulation: null,
      labelPosition: 'top',
      color: function (i) {
        return this.settings.defaultNodeColor // TODO change to hashing
      },
      settings: {
        showLabel: true,
        strokeColor: '#999',
        defaultNodeColor: '#FF0000',
        width: 100,
        tightness: 0,
        svgWigth: window.innerWidth,
        svgHeight: window.innerHeight
      }
    }
  },
  methods: {
    stopSimulation: function (event) {
      // `this` inside methods points to the Vue instance
      this.simulation.stop()
    },
    restartSimulation: function (event) {
      // `this` inside methods points to the Vue instance
      this.simulation.restart()
    }
  },
  mounted: function () {
    var that = this
    console.log('mounted')
    var graph = {}// = input
    //   if (error) throw error
    graph.nodes = this.wsdata.nodes
    graph.links = this.wsdata.links
    that.graph = graph
    console.log('json')

    that.simulation = d3
      .forceSimulation(that.graph.nodes)
      .force(
        'link',
        d3
          .forceLink(that.graph.links)
          .id(function (d) { return d.id })
          .distance(function (d) {
            return d.strength * -1 * that.settings.tightness
          })
          .strength(0.1)
      )
      //   .force('link', d3.forceLink(that.graph.links).distance(100).strength(0.1))
      .force('charge', d3.forceManyBody().strength(-1000))
      .force(
        'center',
        d3.forceCenter(that.settings.svgWigth / 2, that.settings.svgHeight / 2)
      )
    // add zoom capabilities
    var zoom_handler = d3.zoom()
      .on('zoom', function () {
        d3.select('.all').attr('transform', d3.event.transform)
      })

    zoom_handler(d3.select('svg'))

    // // setup gitGraph
    // const graphContainer = document.getElementById('gitGraph')
    // // Instantiate the graph.
    // console.log(Orientation)
    // const gitgraph = createGitgraph(graphContainer, {
    //   orientation: Orientation.Horizontal
    // })

    // // Simulate git commands with Gitgraph API.
    // const master = gitgraph.branch('master')
    // const onClick = function (id) {
    //   console.log(id)
    // }
    // master.commit({
    //   subject: 'Hello',
    //   onClick: onClick,
    //   onMessageClick: onClick
    // })

    // const develop = gitgraph.branch('develop')
    // develop.commit('Add TypeScript')

    // const aFeature = gitgraph.branch('a-feature')
    // aFeature
    //   .commit('Make it work')
    //   .commit({ subject: 'Make it right', hash: 'test' })
    //   .commit('Make it fast')

    // develop.merge(aFeature)
    // develop.commit('Prepare v1')

    // master.merge(develop).tag('v1.0.0')
    // master.commit({
    //   subject: 'Hello',
    //   onClick: onClick,
    //   onMessageClick: onClick
    // })
    // master.commit({
    //   subject: 'Hello',
    //   onClick: onClick,
    //   onMessageClick: onClick
    // })
    // master.commit({
    //   subject: 'Hello',
    //   onClick: onClick,
    //   onMessageClick: onClick
    // })
    // master.commit({
    //   subject: 'Hello',
    //   onClick: onClick,
    //   onMessageClick: onClick
    // })
    // master.commit({
    //   subject: 'Hello',
    //   onClick: onClick,
    //   onMessageClick: onClick
    // })
    // master.commit({
    //   subject: 'Hello',
    //   onClick: onClick,
    //   onMessageClick: onClick
    // })

    // const svg = document.querySelector('#gitGraph > svg')
  },
  computed: {
    nodes: function () {
      console.log('recalculating nodes')
      var that = this
      if (that.graph) {
        // get encompassing group for the zoom
        // var all = d3.select('all')
        d3.select('svg')
          .selectAll('.nodes')
          .remove()
        var nodes = d3
          .select('.all')
          .append('g')
          .attr('class', 'nodes')
          .selectAll('.node')
          .attr('stroke', '#fff')
          .attr('stroke-width', 1.5)
          .data(that.graph.nodes)
          .enter()
          .append('g')
          .attr('class', 'node')
          //   .enter().append('circle')
          //   .attr('r', function (d) { return d.size })
          //   .attr('fill', function (d, i) { return that.color(i) })
          .call(
            d3
              .drag()
              .on('start', function dragstarted (d) {
                if (!d3.event.active) { that.simulation.alphaTarget(0.3).restart() }
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
              })
          )

        nodes
          .append('circle')
          .attr('r', 5)
          // TODO get size of whole file
          .attr('r', function (d) {
            return Math.log(d.size) * 3
          })
          .attr('fill', function (d) {
            return that.color(d.id)
          })

        if (that.settings.showLabel) {
          nodes
            .append('text')
            .text(function (d) {
              return d.name
            })
            .attr('x', function (el) {
              return el.size + 2 // offset text by radius + margin
            })
            .attr('y', 3)
        }

        // zoom not working
        // const zoom = d3.zoom()
        //   .scaleExtent([0.1, 10]) // zoom limit
        //   .on('zoom', () => {
        //     nodes.style('stroke-width', `${1.5 / d3.event.transform.k}px`)
        //     nodes.attr('transform', d3.event.transform) // updated for d3 v4
        //   })

        // d3.select('svg').call(zoom)
        // // .call(zoom.transform, d3.zoomIdentity.translate(200, 20).scale(0.25)) //initial size
        //   .append('svg:g')
        //   .attr('transform', 'translate(100,50) scale(.5,.5)')
      }
      return nodes
    },
    links: function () {
      var that = this
      if (that.graph) {
        var all = d3
          .select('.all')
        // var lines = d3
        //   .select('svg')
        //   .append('g')
        //   .attr('stroke', '#999')
        //   .attr('stroke-opacity', 0.6)
        //   .selectAll('line')
        //   .data(that.graph.links)
        //   .enter()
        //   .append('line')
        //   .attr('stroke-width', d => d.value)

          // build the arrow.
        all.append('svg:defs').selectAll('marker')
          .data(['end']) // Different link/path types can be defined here
          .enter().append('svg:marker') // This section adds in the arrows
          .attr('id', String)
          .attr('viewBox', '0 -5 10 10')
          .attr('refX', 15)
          .attr('refY', -1.5)
          .attr('markerWidth', 10)
          .attr('markerHeight', 10)
          .attr('markerUnits', 'userSpaceOnUse')
          .attr('orient', 'auto')
          .append('svg:path')
          .attr('fill', '#000')
          .attr('d', 'M0,-5L10,0L0,5')

          // add the links and the arrows
        var lines = all.append('svg:g').selectAll('path')
          .data(that.graph.links)
          .enter().append('svg:path')
          .attr('class', function (d) { return 'link ' + d.delta })
          .attr('marker-end', 'url(#end)')
          .attr('stroke', that.settings.strokeColor)
          .attr('stroke-width', d => Math.ceil(Math.log(d.strength) + 1) * 2)

        return lines
      }
    }
  },
  updated: function () {
    console.log('updated')
    var that = this
    that.simulation.alphaTarget(0).restart()
    that.simulation.nodes(that.graph.nodes).on('tick', function ticked () {
      that.links
        .attr('x1', function (d) {
          return d.source.x
        })
        .attr('y1', function (d) {
          return d.source.y
        })
        .attr('x2', function (d) {
          return d.target.x
        })
        .attr('y2', function (d) {
          return d.target.y
        })

      // that.links.attr('d', function (d) {
      //   var dx = d.target.x - d.source.x
      //   var dy = d.target.y - d.source.y
      //   var dr = Math.sqrt(dx * dx + dy * dy)
      //   return 'M' +
      //       d.source.x + ',' +
      //       d.source.y + 'A' +
      //       dr + ',' + dr + ' 0 0,1 ' +
      //       d.target.x + ',' +
      //       d.target.y
      // })

      that.links.attr('d', function (d) {
        var tightness = -3.0
        if (d.type === 'straight') { tightness = 1000 }

        var x1 = d.source.x
        var y1 = d.source.y
        var x2 = d.target.x
        var y2 = d.target.y

        // Places the control point for the Bezier on the bisection of the
        // segment between the source and target points, at a distance
        // equal to half the distance between the points.
        var dx = d.target.x - d.source.x
        var dy = d.target.y - d.source.y
        // var dr = Math.sqrt(dx * dx + dy * dy)
        var qx = d.source.x + dx / 2.0 - dy / tightness
        var qy = d.source.y + dy / 2.0 + dx / tightness

        // Calculates the segment from the control point Q to the target
        // to use it as a direction to wich it will move "node_size" back
        // from the end point, to finish the edge aprox at the edge of the
        // node. Note there will be an angular error due to the segment not
        // having the same direction as the curve at that point.
        var dqx = d.target.x - qx
        var dqy = d.target.y - qy
        var qr = Math.sqrt(dqx * dqx + dqy * dqy)

        var offset = 0.8 * d.target.size
        var tx = d.target.x - dqx / qr * offset
        var ty = d.target.y - dqy / qr * offset

        // Self dependencies ie. links to one self
        if (x1 === x2 && y1 === y2) {
          // Fiddle with this angle to get loop oriented.
          var xRotation = -45

          var sweep = 1 // 1 or 0
          // Needs to be 1.
          var largeArc = 1

          // Change sweep to change orientation of loop.
          // sweep = 0;

          // Make drx and dry different to get an ellipse
          // instead of a circle.
          var drx = 20
          var dry = 20

          // For whatever reason the arc collapses to a point if the beginning
          // and ending points of the arc are the same, so kludge it.
          x2 = x2 + 1
          y2 = y2 + 1

          return 'M' + x1 + ',' + y1 + 'A' + drx + ',' + dry + ' ' + xRotation + ',' + largeArc + ',' + sweep + ' ' + x2 + ',' + y2
        }

        return 'M' + d.source.x + ',' + d.source.y + 'Q' + qx + ',' + qy +
                ' ' + tx + ',' + ty // to "node_size" pixels before
        // + " " + d.target.x + "," + d.target.y; // til target
      })

      that.nodes
        // .attr('cx', function (d) { return d.x })
        // .attr('cy', function (d) { return d.y })
        .attr('transform', function (d) {
          return 'translate(' + d.x + ',' + d.y + ')'
        })
    })
    that.nodes.on('click', function clicked (node) {
      console.log(node)
    })
    // that.simulation.restart()
    // that.simulation.tick()
  }
}
</script>
<style>
svg {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.controls {
  position: fixed;
  top: 16px;
  left: 16px;
  background: #f8f8f8;
  /* padding: 0.5rem; */
  display: flex;
  flex-direction: column;
  box-shadow: black;
  /* border: 1px solid black;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, .5); */
  z-index: 20;
}

.bottom {
  position: fixed;
  height: 200px;
  bottom: 16px;
  left: 16px;
  /* margin-right: 16px; */
  /* right: 16px; */
  width: 500px;
  background: #f8f8f8;
  /* padding: 0.5rem; */
  /* display: flex; */
  /* flex-direction: row; */
  box-shadow: black;
  /* border: 1px solid black;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, .5); */
  z-index: 20;
  flex-wrap: nowrap;
  overflow: scroll;
  border: #000 1px solid;
}

.bot-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.bottom svg { 
  height:200px;
  width: 5000px;
  border:1px dotted #ccc;
  background-color: #ccc;
  position: relative; }


.setting {
  padding: 5px 0;
  /* border-bottom: #666 1px solid; */
  
}

.setting label {
  font-size: 80%;
  /* border-bottom: #666 1px solid; */
}

.controls > * + * {
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

path.link {
  fill: none;
  /* stroke: #666; */
  /* stroke-width: 1.5px; */
}

</style>
