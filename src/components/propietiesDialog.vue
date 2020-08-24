<template>
  <el-dialog
    title="配置属性"
    @close="propietiesClose"
    custom-class="propietiesDialogClass"
    :visible.sync="show"
    width="28%"
  >
    <el-form
      :model="attrForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="数据源" prop="api">
        <el-input
          size="mini"
          v-model="attrForm.api"
          style="width:300px;margin-top:5px;"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="结果集属性名" prop="resultAttr">
        <el-input
          v-model="attrForm.resultAttr"
          size="mini"
          style="width:300px;margin-top:5px;"
        >
          <el-button @click="getData" slot="append">Get</el-button>
        </el-input>
      </el-form-item>
      <el-form-item v-if="attrs.length != 0" label="X轴" prop="x">
        <el-select size="mini" style=" width: 300px;" v-model="attrForm.x">
          <el-option
            v-for="(item, index) in attrs"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="attrs.length != 0" label="Y轴" prop="y">
        <el-select size="mini" style=" width: 300px;" v-model="attrForm.y">
          <el-option
            v-for="(item, index) in attrs"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="attrs.length != 0" label="类别" prop="type">
        <el-select size="mini" style=" width: 300px;" v-model="attrForm.type">
          <el-option
            v-for="(item, index) in attrs"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" @click="generate" type="primary">确定</el-button>
        <el-button size="mini" @click="defaultMethod" type="primary"
          >暂不设置</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
// import data from "@/assets/global/data.json";
import { page } from "@/assets/api/studentApi";

export default {
  name: "PropietiesDialog",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    //这里存放数据
    return {
      attrs: [],
      attrForm: {
        x: "",
        y: "",
        type: "",
        api: "",
        resultAttr: ""
      },
      rules: {
        api: [
          { required: true, message: "请输入数据源的api地址", trigger: "blur" }
        ],
        resultAttr: [
          {
            required: true,
            message: "请输入调用api后结果集的属性名称",
            trigger: "blur"
          }
        ],
        x: [{ required: true, message: "请选择x轴属性", trigger: "change" }],
        y: [{ required: true, message: "请选择y轴属性", trigger: "change" }],
        type: [{ required: true, message: "请选择类型属性", trigger: "change" }]
      },
      data: []
    };
  },
  //方法集合
  methods: {
    getAttrs(data) {
      if (!data) {
        return;
      }
      this.data = data;
      this.attrs = [];
      let firstData = data[0];
      for (let key in firstData) {
        this.attrs.push(key);
      }
    },
    propietiesClose() {
      this.resetForm();
      this.$emit("close");
    },
    defaultMethod() {
      this.$emit("defaultMethod");
      this.resetForm();
      this.$emit("close");
    },
    getData() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.$axios.get(this.attrForm.api).then(res => {
            this.getAttrs(eval(`res.data.` + this.attrForm.resultAttr));
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    generate() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.$emit("generate", this.data, this.attrForm);
          this.resetForm();
          this.$emit("close");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.attrForm = {
        x: "",
        y: "",
        type: "",
        api: "",
        resultAttr: ""
      };
      this.attrs = [];
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {} //生命周期 - 销毁之前
};
</script>
<style type="text/scss" lang="scss">
.propietiesDialogClass {
  .el-form-item__content {
    text-align: left;
  }
}
</style>
