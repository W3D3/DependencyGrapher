<template>
  <div id="wrapper">
    <!-- <img id="logo" src="~@/assets/logo.png" alt="electron-vue"> -->
    <main>
      <force-graph />
      <!-- <div class="left-side"> -->
        <!-- <span class="title">
          Welcome to your new project!!
        </span>
        <sidebar /> -->
        <!-- <system-information></system-information> -->
        <!-- <d3-network ref='net' :net-nodes="nodes" :net-links="links" :options="options" /> -->
        
      <!-- </div> -->

      <!-- <div class="right-side">
        <div class="doc">
          <div class="title">Getting Started</div>
          <p>
            electron-vue comes packed with detailed documentation that covers everything from
            internal configurations, using the project structure, building your application,
            and so much more.
          </p>
          <button @click="open('https://simulatedgreg.gitbooks.io/electron-vue/content/')">Read the Docs</button><br><br>
        </div>
        <div class="doc">
          <div class="title alt">Other Documentation</div>
          <vs-button @click="open('https://electron.atom.io/docs/')">Electron</vs-button>
          
          <vs-button color="primary" type="filled">Primary</vs-button>
        </div>
      </div> -->
    </main>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'
  import Sidebar from './Sidebar'
  import D3Network from 'vue-d3-network'
  import SimpleGraph from './SimpleGraph'
  import ForceGraph from './graph/ForceGraph'

  export default {
    name: 'landing-page',
    components: { SystemInformation, Sidebar, D3Network, SimpleGraph, ForceGraph },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      addNode (node) {
        this.nodes.push({
          id: 32, name: 'New node', _color: 'red'
        })
      }
    },
    data () {
      return {
        nodes: [
          { id: 1, name: 'my awesome node 1' },
          { id: 2, name: 'my node 2' },
          { id: 3, name: 'orange node', _color: 'orange' },
          { id: 4, _color: '#0022ff' },
          { id: 5 },
          { id: 6 },
          { id: 7 },
          { id: 8 },
          { id: 9 }
        ],
        links: [
          { sid: 1, tid: 2, _color: 'red' },
          { sid: 2, tid: 8, _color: 'red' },
          { sid: 3, tid: 4, _color: 'red' },
          { sid: 4, tid: 5, _color: 'red' },
          { sid: 5, tid: 6, _color: 'red' },
          { sid: 7, tid: 8, _color: 'red' },
          { sid: 5, tid: 8, _color: 'red' },
          { sid: 3, tid: 8, _color: 'red' },
          { sid: 7, tid: 9, _color: 'red' }
        ],
        options: {
          force: 2000,
          nodeSize: 20,
          nodeLabels: true,
          linkWidth: 5
        }
      }
    },
    computed: {
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }
/* 
  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  } */

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  /* d3 stuff */


</style>
