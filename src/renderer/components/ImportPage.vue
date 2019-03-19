<template>
  <div id="wrapper">
    <!-- <img id="logo" src="~@/assets/logo.png" alt="electron-vue"> -->
    <main>
      <!-- <force-graph /> -->
      <div class="left-side">
        <span class="title">Dependency Analyzer <el-tag type="danger">ALPHA</el-tag></span>
        <el-form ref="form" :model="form" >
          <el-form-item label="Local path">
            <el-input v-model="form.path" readonly></el-input>
            <input class="custom-file-input" @change="previewFiles" type="file" webkitdirectory />

          </el-form-item>
          <el-form-item label="Webservice URL">
            <el-input v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Analyze</el-button>
            <el-button>Cancel</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="right-side">
        <div class="doc">
          <div class="title">Getting Started</div>
          <p>
            electron-vue comes packed with detailed documentation that covers everything from
            internal configurations, using the project structure, building your application,
            and so much more.
          </p>
          <el-button
            @click="open('https://simulatedgreg.gitbooks.io/electron-vue/content/')"
          >Read the Docs</el-button>
          <br>
          <br>
        </div>
        <div class="doc">
          <div class="title alt">Other Documentation</div>
          <router-link to="/graph">
            <el-button>Graph</el-button>
          </router-link>
          <router-link to="/simple">
            <el-button>Simple D3 Test</el-button>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// import SystemInformation from './LandingPage/SystemInformation'
// import Sidebar from './Sidebar'
// import D3Network from 'vue-d3-network'
// import SimpleGraph from './SimpleGraph'
// import ForceGraph from './graph/ForceGraph'
import axios from 'axios'

export default {
  data () {
    return {
      form: {
        path: '',
        url: 'http://localhost:8080/v1/'
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit:' + this.form.url)
      axios.post('/dependencies/project', this.form.url)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    previewFiles (event) {
      console.log(event.target.files)
      if (event.target.files.length > 0) {
        this.form.path = event.target.files[0].path
      }
    }
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");
// @import "node_modules/element-ui/lib/theme-chalk/button.css";

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  padding: 60px 80px;
  width: 100vw;
}

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 420px;
}

main {
  display: flex;
  justify-content: space-between;
}

main > div {
  flex-basis: 50%;
}

.left-side {
  display: flex;
  flex-direction: column;
  padding: 20px
}

.welcome {
  color: #555;
  /* font-size: 23px; */
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

el-form {
  margin-right: 3em;
}
.custom-file-input {
  color: transparent;
}
.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}

.custom-file-input::before {
  content: 'Select folder of git repo';
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: .1s;
  transition: .1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px
}

.custom-file-input:hover::before {
  border-color: black;
}

.custom-file-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
}
  // @extend .el-button;


</style>
