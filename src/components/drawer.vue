<template>
  <div class="">
    <el-drawer
      :visible.sync="drawer"
      :close-on-press-escape="false"
      :show-close="false"
      :wrapperClosable="false"
      :append-to-body="true"
      :title="title"
      style="z-index:-1;"
      :size="size"
      :modal="false"
      :direction="drawerDirection"
    >
      <slot></slot>
    </el-drawer>
    <div class="icoClass" v-if="close" :style="site" @click="changeStatus">
      <img style="width:100%;" :src="icoSrc" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Drawer",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    position: {
      type: String,
      default: "left"
    },
    defaultShow: {
      type: Boolean,
      default: false
    },
    close: {
      //是否可关闭 (此属性为false时，只能是展开状态 即drawer永远为true 且不显示图标)
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: "30%"
    },
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    //这里存放数据
    return {
      left: require("../assets/icon/left.png"),
      right: require("../assets/icon/right.png"),
      site: "",
      drawer: false
    };
  },
  computed: {
    icoSrc() {
      if (this.drawer) {
        return this.position == this.GLOBAL.LEFT ? this.left : this.right;
      } else {
        return this.position == this.GLOBAL.LEFT ? this.right : this.left;
      }
    },
    drawerDirection() {
      if (this.position == this.GLOBAL.LEFT) {
        return "ltr";
      } else {
        return "rtl";
      }
    }
  },
  watch: {
    drawer: {
      immediate: true,
      handler() {
        if (this.drawer) {
          this.site = `${this.position}:${this.size}${
            typeof this.size == "Number" ? "px" : ""
          };`;
        } else {
          this.site = `${this.position}:0;`;
        }
      }
    },
    close: {
      immediate: true,
      handler() {
        if (!this.close) {
          this.drawer = true;
        }
      }
    }
  },
  //方法集合
  methods: {
    changeStatus() {
      if (this.close) {
        this.drawer = !this.drawer;
      }
    }
  },
  created() {
    this.drawer = this.defaultShow;
    if (!this.close) this.drawer = true;
  },
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {} //生命周期 - 销毁之前
};
</script>

<style type="text/scss">
.icoClass {
  width: 50px;
  height: 50px;
  position: absolute;
  top: calc(50vh - 25px);
  z-index: 999999;
}
:focus {
  outline: 0;
}
</style>
