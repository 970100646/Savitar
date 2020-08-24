<template>
  <div class="appContainer">
    <drawer
      :defaultShow="true"
      v-show="leftShow"
      size="25%"
      title="组件"
      :position="GLOBAL.LEFT"
    >
      <el-collapse accordion>
        <el-collapse-item title="按钮类" name="1">
          <el-row :gutter="20">
            <el-col :span="8"
              ><el-button
                @mousedown.native="beginMove($event, control)"
                size="mini"
                >按钮</el-button
              ></el-col
            >
            <el-col :span="8"
              ><el-link
                size="mini"
                @mousedown.native="beginMove($event, control)"
                type="primary"
                >文字链接</el-link
              ></el-col
            >
            <el-col :span="8"
              ><el-radio @mousedown.native="beginMove($event, control)"
                >单选框</el-radio
              ></el-col
            >
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8"
              ><el-checkbox @mousedown.native="beginMove($event, control)"
                >多选框</el-checkbox
              ></el-col
            >
            <el-col :span="8"
              ><el-switch
                active-color="#13ce66"
                inactive-color="#ff4949"
                @mousedown.native="beginMove($event, control)"
                active-text="开关"
              >
              </el-switch
            ></el-col>
            <el-col :span="8"></el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="图表" name="2">
          <el-row :gutter="20">
            <el-col :span="8">
              <img
                @mousedown="beginMove($event, chart)"
                style="width: 100%"
                src="../../assets/img/line-stack.jpg"
                alt=""
              />
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8"></el-col>
            <el-col :span="8"></el-col>
            <el-col :span="8"></el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
      <el-button @click="getHtml"></el-button>
    </drawer>
    <drawer
      :defaultShow="true"
      :close="false"
      size="20%"
      :position="GLOBAL.RIGHT"
    >
    </drawer>

    <div id="innerHtml" @mousemove="moveControl" @mouseup="endMove"></div>
    <propieties-dialog
      :show="dataPropietiesShow"
      @close="propietiesClose"
      @defaultMethod="drawDefaultCharts"
      @generate="drawCharts"
    ></propieties-dialog>
  </div>
</template>

<script>
import Drawer from "@/components/drawer";
import defaultData from "@/assets/global/data.json";
import echarts from "echarts";
import PropietiesDialog from "@/components/propietiesDialog";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: { Drawer, PropietiesDialog },
  data() {
    //这里存放数据
    return {
      leftShow: true,
      is_move: false,
      tempElement: null,
      createElement: null,
      type: "control",
      control: "control",
      chart: "chart",
      idIndex: 0,
      dataPropietiesShow: false,
      data: null
    };
  },
  computed: {},
  watch: {},
  //方法集合
  methods: {
    /**
     * 开始拖拽
     * */
    beginMove(e, type) {
      this.type = type;
      if (type == this.chart) {
        this.chartBeginMove(e);
      } else {
        this.controlBeginMove(e);
      }
    },
    /**
     * 开始拖拽控件
     *
     * */
    controlBeginMove(e) {
      this.is_move = true;
      //隐藏页面上其他元素
      this.leftShow = false;
      //clone一个新元素出来 此为本体
      this.createElement = e.currentTarget.cloneNode(true);
      // 创建一个临时元素
      this.tempElement = document.createElement("div");
      this.tempElement.style.position = "absolute";
      // 给它设置一个边框
      this.tempElement.style.border = "1px dashed #fc6";
      this.tempElement.style.width = e.currentTarget.offsetWidth + "px";
      this.tempElement.style.height = e.currentTarget.offsetHeight + "px";
      document.getElementById("innerHtml").append(this.tempElement);
    },
    chartBeginMove() {
      this.is_move = true;
      //隐藏页面上其他元素
      this.leftShow = false;
      this.tempElement = document.createElement("div");
      this.tempElement.id = `${this.chart + this.idIndex++}`;
      this.tempElement.style.border = "1px solid #fc6";
      this.tempElement.style.position = "absolute";
      this.tempElement.style.backgroundColor = "rgba(65, 170, 199,0.5)";
      this.tempElement.style.width = "300px";
      this.tempElement.style.height = "200px";
      document.getElementById("innerHtml").append(this.tempElement);
    },
    /**
     * 拖拽过程
     * */
    moveControl(e) {
      if (this.is_move) {
        this.tempElement.style.top =
          e.clientY - this.tempElement.offsetHeight / 2 + "px";
        this.tempElement.style.left =
          e.clientX - this.tempElement.offsetWidth / 2 + "px";
      }
    },
    /**
     * 拖拽完成
     * @param e
     */
    endMove(e) {
      if (this.type == "chart") {
        this.chartEndMove();
      } else {
        this.controlEndMove();
      }
    },
    /**
     *  控件拖拽完成
     * **/
    controlEndMove() {
      this.is_move = false;
      this.leftShow = true;
      //设置本体的属性
      this.createElement.style.position = "absolute";
      //将临时元素的位置取到本体
      this.createElement.style.top = this.tempElement.style.top;
      this.createElement.style.left = this.tempElement.style.left;
      document.getElementById("innerHtml").append(this.createElement);
      //移除临时元素
      this.tempElement.remove();
      this.tempElement = null;
    },
    /***
     * 图表拖拽完成
     */
    chartEndMove() {
      if (this.is_move) {
        this.leftShow = true;
        //移除临时元素
        this.tempElement = null;
        this.is_move = false;
        this.dataPropietiesShow = true;
      }
    },
    propietiesClose() {
      this.dataPropietiesShow = false;
    },
    initData(datas, attrForm) {
      let data = { x: [], series: [] };
      let type = [];
      datas.forEach(p => {
        if (data.x.indexOf(p[attrForm.x]) == -1) {
          data.x.push(p[attrForm.x]);
        }
        if (type.indexOf(p[attrForm.type]) == -1) {
          type.push(p[attrForm.type]);
        }
      });
      type.forEach(p => {
        data.series.push({
          name: p,
          type: "line",
          data: []
        });
        datas
          .filter(item => item[attrForm.type] == p)
          .forEach(x => {
            data.series
              .filter(sitem => sitem.name == p)[0]
              .data.push(x[attrForm.y]);
          });
      });
      return data;
    },
    drawDefaultCharts() {
      let data = this.initData(defaultData, {
        x: "date",
        y: "count",
        type: "type"
      });
      let chart = echarts.init(
        document.getElementById(`${this.chart + (this.idIndex - 1)}`)
      );
      chart.setOption({
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: data.x
        },
        yAxis: {
          type: "value"
        },
        series: data.series
      });
    },
    drawCharts(datas, attrForm) {
      let data = this.initData(datas, attrForm);
      console.log(data);
      let chart = echarts.init(
        document.getElementById(`${this.chart + (this.idIndex - 1)}`)
      );
      chart.setOption({
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: data.x
        },
        yAxis: {
          type: "value"
        },
        series: data.series
      });
    },
    getHtml() {
      var innerHTML = document.getElementById("innerHtml").innerHTML;
      console.log(innerHTML);
    }
  },
  created() {},
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {} //生命周期 - 销毁之前
};
</script>
<style type="text/scss">
#innerHtml {
  height: 100vh;
  text-align: left;
  z-index: -1;
}
</style>
