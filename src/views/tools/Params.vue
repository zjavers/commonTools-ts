<script setup lang="ts">
  import { ref } from 'vue'
  import {
    DocumentCopy
} from '@element-plus/icons-vue'

import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
  
  const text = ref('');
  const errorMessage = ref({});
  const router = useRouter()
  const placeholder = import.meta.env.VITE_PARAM_PLACEHOLDER || '请输入参数'

  //转换报文
  const submit = async ()=> {

    if(text.value!==''){
      
      errorMessage.value = encodingTLV2(text.value)
      
    }else{
      ElMessage.warning('请输入报文！')
    }

  }

  function encodingTLV2(str: string): Array<[string, string, string]> {
    let ls: Array<[string, string, string]> = [];
    
    for (let i = 0; i < str.length;) {
        let tag = str.substring(i, i + 2);
        i += 2;

        let len: string;
        if (tag === "0A" || tag === "0C" || tag === "0B") {
            len = str.substring(i, i + 4);
            i += 4;
        } else {
            len = str.substring(i, i + 2);
            i += 2;
        }

        let length = parseInt(len);
        let value = interceptStr(str.substring(i), length);
        i += value.length;

        
        ls.push([tag, len, value]);
    }

    return ls;
}

function interceptStr(str: string, length: number): string {
    // 假设这里需要实现 PBOC_TLV.interceptStr 的逻辑
    // 因为并未提供具体实现，因此假设返回指定长度的子字符串。
    return str.substring(0, length);
}

// 计算字符串的实际显示长度
function getDisplayLength(str: string): number {
    let length = 0;
    for (const char of str) {
        // 中文字符的unicode范围
        if (char.match(/[^\x00-\xff]/)) {
            length += 2;  // 全角字符宽度为2
        } else {
            length += 1;  // 半角字符宽度为1
        }
    }
    return length;
}

//复制操作
function copy() {
  if(errorMessage.value.length>0){
    let content = ''
    
    for (let [index, item] of Object.entries(errorMessage.value)) {
      console.log(index,item);
      
      //拼接值复制
      const field = `【${item[0]}】`;
      content += field.trim().padEnd(20)+ ''
      content +=`【${item[1]}】`.toString().padEnd(30-getDisplayLength(item[1])+item[1].trim().length,' ')
      content +=`【${item[2]}】\n`
      //55域特殊处理
    }

    const textarea = document.createElement('textarea')
    textarea.value = content
    document.body.appendChild(textarea)
    textarea.select()

    try {
      document.execCommand('copy')
      ElMessage.success('复制成功！')
    } catch (err) {
      ElMessage.error('复制失败，请重试！')
    }

    document.body.removeChild(textarea)
  }else{
    ElMessage.warning('请输入参数！')
  }
}

//返回home
function back(){
  router.push('/');
}
</script>
<template >
  <div class="switch">
    <el-button @click="back()">返回</el-button>
    <!-- <el-switch class="button" v-model="switchFlag"/> -->
  </div>
  <div class="middle">
    
    <div class="item-left">
      <div class="top">
        <div class="circle">
          <span class="red circle2"></span>
        </div>
        <div class="circle">
          <span class="yellow circle2"></span>
        </div>
        <div class="circle">
          <span class="green circle2"></span>
        </div>
        <div class="title">
        </div>
      </div>
      <el-input type="textarea" class="textarea" v-model="text" :placeholder="placeholder"
            style="width: 470px" input-style="background-color: rgb(73, 70, 92);color: white;overflow-y: 0;border-radius: 17px;padding: 1rem;box-shadow: none;height:637px"
            :rows="30"/>
    </div>
  
    <div class="item-mid">
      <el-button @click="submit()">转换</el-button>
    </div>
  
    <div class=" card" id="result">
      <div class="top">
        <div class="circle">
          <span class="red circle2"></span>
        </div>
        <div class="circle">
          <span class="yellow circle2"></span>
        </div>
        <div class="circle">
          <span class="green circle2"></span>
        </div>
        <div class="title">
        </div>
        <div class="header2">
          <el-button class="copy-btn" @click="copy()" :icon="DocumentCopy" />
        </div>
      </div>
      <div class="header-left">
        <el-row  v-for="(item) in errorMessage" >
          <!-- {{ index }} + {{ item }}  -->
          <el-col :span="3">【{{ item[0] }}】</el-col>
          <el-col :span="2">【{{item[1]}}】</el-col>
          <el-col :span="15">【{{item[2]}}】</el-col>
        </el-row>
      </div>
    </div>
  
  </div>
    
  </template>
  <style lang='css'>
    body{
      margin: 0;
      padding: 0;
      background-color: #e8e8e8;
    }
    .switch{
      display: flex;
      float: left;
    }
  
    .card {
      height: calc(41rem + 5px);
      text-align: left;
      float: left;
      width: 53rem;
      background-color: #24233b;
      border-radius: 8px;
      z-index: 1;
      box-shadow: 0px 10px 10px rgb(73, 70, 92);
      transition: 0.5s;
      padding: 1rem;
    }
  
    .middle{
      display: inline;
      position: relative;
      left: 10rem;
      top: 10rem;
    }
  
    .item-left{
      float: left;
      padding: 1rem;
      background-color: #24233b;
      border-radius: 8px;
      z-index: 1;
      box-shadow: 0px 10px 10px rgb(73, 70, 92);
      transition: 0.5s;
    }
  
    .item-mid{
      float: left;
      display: flex;
      height: 40rem;
      justify-content:center;
      flex-direction: column;
      margin: 0 1rem ;
      width: 5rem;
    }
  
    .header-left{
      display: flex;
      flex-direction: column;
      overflow: auto;
      background-color: rgb(73, 70, 92);
      color: white;
      overflow-y: 0;
      border-radius: 17px;
      padding: 1rem;
      height: calc(91% + 3px);
    }
  
  .top {
    display: flex;
    align-items: center;
    padding-left: 10px;
    text-align: center;
  }
  
  .circle {
    padding: 0 4px;
  }
  
  .circle2 {
    display: inline-block;
    align-items: center;
    width: 10px;
    height: 10px;
    padding: 1px;
    border-radius: 5px;
  }
  
  .red {
    background-color: #ff605c;
  }
  
  .yellow {
    background-color: #ffbd44;
  }
  
  .green {
    background-color: #00ca4e;
  }
  
  .title{
    width: 100%;
  }
  
  .header2{
    float: right;
    /* height: 40px; */
  }
  .copy-btn{
    background-color: #24233b;
    border: none;
    margin-right: -1rem;
    margin-top: calc(-1rem - 11px);
    border-top-right-radius: 8px;
    color: white;
  }
  
    
  </style>
