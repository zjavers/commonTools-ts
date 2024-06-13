<script setup lang="ts">
  import { ref } from 'vue'
  import { data8583 } from '@/api'
  import {
    DocumentCopy
} from '@element-plus/icons-vue'

import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

  const text = ref('');
  const errorMessage = ref([]);
  const switchFlag= ref(true)
  const router = useRouter()
  const placeholder = import.meta.env.VITE_DATA8583_PLACEHOLDER || '请输入报文'

  //转换报文
  const submit = async ()=> {

    if(text.value!==''){
      const req = await data8583(text.value)
      if(req.code!==0){
        alert(!req.msg ? '服务请求有误，请稍后再试！' : req.msg)
      }else{
        errorMessage.value = req.data
      }
    }else{
      ElMessage.warning('请输入报文！')
    }

  }

function coumputedF55(data){
  return Array.from(decodeF55(hexStrToBytes(data)).entries());
}

//计算长度
function computedLength(index :any,item :any){
  if(index === '64' || index === '55' || index === '56'){
    return (item.length/2).toString().padStart(3,'0')
  }
  return item.length.toString().padStart(3,'0')
}

//域描述
function description(index: any){
  switch(index){
    case '0':
      return '位图';
    case '2':
      return '主帐号';
    case '3':
      return '交易处理码';
    case '4':
      return '交易金额';
    case '11':
      return '系统跟踪号';
    case '12':
      return '受卡方所在地时间';
    case '13':
      return '受卡方所在地日期';
    case '14':
      return '卡有效期';
    case '15':
      return '清算日期';
    case '17':
      return 'POS机S/N码';
    case '22':
      return '服务点输入方式码';
    case '23':
      return '卡序列号';
    case '25':
      return '服务点条件码';
    case '26':
      return '服务点PIN获取码';
    case '31':
      return '接入机构标识码';
    case '32':
      return '受理机构标识码';
    case '34':
      return '行业特定信息';
    case '35':
      return '2磁道数据';
    case '36':
      return '3磁道数据';
    case '37':
      return '检索参考号';
    case '38':
      return '金融网络数据';
    case '39':
      return '应答码';
    case '41':
      return '受卡机终端标识码';
    case '42':
      return '受卡方标识码';
    case '44':
      return '附加响应数据';
    case '46':
      return '返回支付类型';
    case '48':
      return '附加数据 - 私有';
    case '49':
      return '交易货币代码';
    case '52':
      return '个人标识码数据';
    case '53':
      return '安全控制信息';
    case '54':
      return '余额';
    case '55':
      return '基于PBOC借贷记标准的IC卡数据';
    case '56':
      return '自定义域';
    case '57':
      return '附加交易信息';
    case '58':
      return 'PBOC电子钱包标准的交易信息';
    case '59':
      return '其他终端信息';
    case '60':
      return '自定义域';
    case '61':
      return '原始信息域';
    case '62':
      return '自定义域';
    case '63':
      return '金融网络数据';
    case '64':
      return 'MAC';
    default:
      return '未知';
  }
}


function decodeF55(f55: Uint8Array | null): Map<string, string> {
    const map = new Map<string, string>();
    let offset = 0;

    while (offset < f55.length) {
        // Step 1: 取tag
        const tagLength = (f55[offset] & 0x1F) === 0x1F ? 2 : 1; // 第1个字节后5bit全为1，则tag占2字节，否则占1字节
        const tag = f55.slice(offset, offset + tagLength);
        offset += tagLength;

        // Step 2: 取数据长度
        let valueLength = 0;
        if (f55[offset] >= 0) { // 最左bit为0时，长度占1个字节
            valueLength = f55[offset++];
        } else if (f55[offset] === 0x81) { // 1000 0001，后面1个字节表示长度
            valueLength = f55[offset + 1];
            offset += 2;
        } else if (f55[offset] === 0x82) { // 1000 0010，后面2个字节表示长度
            valueLength = (f55[offset + 1] << 8) | f55[offset + 2];
            offset += 3;
        } else { // 其他长度格式暂不支持
            throw new Error("value length error!");
        }

        // Step 3: 取值
        let value: Uint8Array | null = null;
        if (valueLength !== 0) {
            value = f55.slice(offset, offset + valueLength);
            offset += valueLength;
        }

        // Step 4: tag - value
        map.set(hexBytesToStr(tag), hexBytesToStr(value));
    }

    return map;
}
function hexBytesToStr(bytes: Uint8Array | null): string {
    if (!bytes) return "";
    return Array.from(bytes)
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
}
function hexStrToBytes(hexStr: string): Uint8Array | null {
    if (hexStr === null || hexStr.trim().length === 0) {
        return null;
    }

    const length = hexStr.length / 2;
    const bytes = new Uint8Array(length);

    for (let i = 0; i < length; i++) {
        const subStr = hexStr.substring(i * 2, i * 2 + 2);
        bytes[i] = parseInt(subStr, 16);
    }

    return bytes;
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

//16进制转中文
function hexToChinese(hexStr: string): string {
    // 将16进制字符串转换为Uint8Array
    const bytes = new Uint8Array(hexStr.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

    // 使用TextDecoder解码为字符串，默认编码为utf-8
    const decoder = new TextDecoder("gbk");
    const decodedStr = decoder.decode(bytes);

    return decodedStr;
}

//复制操作
function copy() {
  if(errorMessage.value.length>0){
    let content = ''
    
    for (let [index, item] of Object.entries(errorMessage.value)) {
      //拼接值复制
      const field = `F${index.toString().padStart(3,'0')}.${description(index)}`;
      content += field.trim().padEnd(40-getDisplayLength(field)+field.trim().length)+ ' = '
      content +=`【${computedLength(index,item)}】`.toString().padEnd(5,' ')
      content +=`【${index == '56' ? hexToChinese(item):item}】\n`
      //55域特殊处理
      if (index === '55') {
        for (const [key, value] of coumputedF55(item)) {
          content += `  【TAG: `+key.padStart(4,' ')+`】      【LEN: ${computedLength('55',value)}】     【${value}】\n`
        }
      }
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
    ElMessage.warning('请输入报文！')
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
  
  
  <div class="item-left" :class="!switchFlag ? 'result-style1' : 'result-style2'">
    <div v-if="switchFlag" class="top">
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
          style="width: 470px" :input-style="!switchFlag ? 'background: rgb(5, 6, 45);border-radius: 17px;outline: none;box-shadow: none;padding: 1rem;color: #9290C3;' : 'background-color: rgb(73, 70, 92);color: white;overflow-y: 0;border-radius: 17px;padding: 1rem;box-shadow: none;height:637px'"
          :rows="30"/>
  </div>

  <div class="item-mid">
    <el-button @click="submit()">转换</el-button>
  </div>

  <div :class="!switchFlag ? 'result result-style1' : 'card'" id="result">
    <div v-if="switchFlag" class="top">
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
    <div class="header-left" :class="!switchFlag ? 'header-style1' : 'code-container'">
      <el-row  v-for="(item,index) in errorMessage" >
        <el-col :span="10">{{ index }}.{{ description(index) }}</el-col>
        <el-col :span="2">【{{computedLength(index,item)}}】</el-col>
        <el-col :span="12">【{{index == 56 ? hexToChinese(item):item}}】</el-col>

        <div v-if="index == 55" style="width: 100%;">
          <el-row v-for="([key,value]) in coumputedF55(item)">
            &nbsp;&nbsp;
            <el-col :span="4">【TAG:{{ key.padStart(4,' ') }}】</el-col>
            <el-col :span="4">【LEN:{{computedLength('55',value)}}】 </el-col>
            <el-col :span="4">【{{value}}】</el-col>
          </el-row>
          
        </div>
      </el-row>
    </div>
    <div v-if="!switchFlag" class="header" :class="!switchFlag ? '' : 'header2'">
      <el-button class="copy-btn" circle @click="copy()" :icon="DocumentCopy" />
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

  .result{
    height: calc(41rem + 5px);
    text-align: left;
    float: left;
    width: 53rem;
    display: grid;
    grid-template-columns: 1fr auto;
    overflow: hidden;
    padding: 1rem;
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

  .result-style1{
    border-radius: 20px;
    box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
    background-image: linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB);
  }

  .result-style2{
    background-color: #24233b;
    border-radius: 8px;
    z-index: 1;
    box-shadow: 0px 10px 10px rgb(73, 70, 92);
    transition: 0.5s;
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
  }

  .el-textarea__inner{
    height: 50%;
  }

  .item-mid{
    float: left;
    display: flex;
    height: 40rem;
    justify-content:center;
    flex-direction: column;
    margin: 0 1rem ;
    /* position: relative; */
    width: 5rem;
  }

  .header-left{
    display: flex;
    flex-direction: column;
    overflow: auto;
    
  }
  .header-style1{
    background: rgb(5, 6, 45);
    border-radius: 17px;
    padding: 1rem;
    color: #9290C3;
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

.header {
  /* margin: 5px; */
  /* margin-top: 5px; */
  margin: 1rem;
  border-radius: 5px;
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

#title2 {
  color: white;
  padding-left: 50px;
  font-size: 15px;
}

.code-container{
  background-color: rgb(73, 70, 92);
  color: white;
  overflow-y: 0;
  border-radius: 17px;
  padding: 1rem;
  height: calc(91% + 3px);
}

  
</style>
