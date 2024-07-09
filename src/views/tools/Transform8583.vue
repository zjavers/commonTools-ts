<script setup lang="ts">
  import { ref } from 'vue'
  import { data8583,data8583toString } from '@/api'
  import {
    DocumentCopy
} from '@element-plus/icons-vue'

import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

  const text = ref('CardPay');
  const errorMessage = ref('');
  const switchFlag= ref(true)
  const router = useRouter()

  //转换报文
  const submit = async ()=> {
    console.log(params.value);
    for (let [index, item] of Object.entries(params.value)) {
      if(item.trim()==='' && index!='44'){
        delete params.value[index];
      }
      console.log(index, item);
    }
    const req = await data8583toString(params.value)
    console.log(req);
    
    if(req.code!==0){
      alert(!req.msg ? '服务请求有误，请稍后再试！' : req.msg)
    }else{
      errorMessage.value = req.data
    }
  }

  //转换报文
  const reback = async ()=> {

  if(errorMessage.value!==''){
    const req = await data8583(errorMessage.value)
    if(req.code!==0){
      alert(!req.msg ? '服务请求有误，请稍后再试！' : req.msg)
    }else{
      console.log(req.data);
      console.log(typeof req.data);
      req.data['0']=errorMessage.value.substring(22,26)
      params.value = req.data
    }
  }else{
    ElMessage.warning('请输入报文！')
  }

  }

const param = ref(
  ['0','2','3','4','11','12','13','14','15','17','22','23','25','26','31','32','34','35','36','37','38','39','41','42','44','46','48','49','52','53','54','55','56','57','58','59','60','61','62','63','64']
)

const params = ref(
  {
    '2':'主帐号',
    '3':'交易处理码',
    '4':'交易金额',
    '11':'系统跟踪号',
    '12':'受卡方所在地时间',
    '13':'受卡方所在地日期',
    '14':'卡有效期',
    '15':'清算日期',
    '17':'POS机S/N码',
    '22':'服务点输入方式码',
    '23':'卡序列号',
    '25':'服务点条件码',
    '26':'服务点PIN获取码',
    '31':'接入机构标识码',
    '32':'受理机构标识码',
    '34':'行业特定信息',
    '35':'2磁道数据',
    '36':'3磁道数据',
    '37':'检索参考号',
    '38':'金融网络数据',
    '39':'应答码',
    '41':'受卡机终端标识码',
    '42':'受卡方标识码',
    '44':'附加响应数据',
    '46':'返回支付类型',
    '48':'附加数据 - 私有',
    '49':'交易货币代码',
    '52':'个人标识码数据',
    '53':'安全控制信息',
    '54':'余额',
    '55':'基于PBOC借贷记标准的IC卡数据',
    '56':'自定义域',
    '57':'附加交易信息',
    '58':'PBOC电子钱包标准的交易信息',
    '59':'其他终端信息',
    '60':'自定义域',
    '61':'原始信息域',
    '62':'自定义域',
    '63':'金融网络数据',
    '64':'MAC',
  }
)
// 报文参数
const optionParam = ref(
  {
    'CardPay': {
      '0':'0200',
      '2':'6225768219286018',
      '3':'000000',
      '4':'000000000001',
      '11':'000151',
      '22':'072',
      '23':'0002',
      '25':'00',
      '35':'2B0DE1E4DF38B4A88708FED501C86716',
      '41':'87043469',
      '42':'85735017011M594',
      '49':'156',
      '53':'0610000000000000',
      '55':'9F2608305C14FD70855C119F2701809F101307010103A00000040A010000000000F5BCEEF89F370447D8D4E49F36020392950500000000009A032406289C01009F02060000000000015F2A02015682027C009F1A0201569F03060000000000009F3303E0E9C89F3501229F1E0830303030303030318408A0000003330101029F090200209F410400000001',
      '59':'A2340102040212N7NL0008826105082.5.16  ',
      '60':'22000006000601',
      '64':'C8036C9519069870'
    },
    'CardPayRtn':{
      '0':'0220',
      '2':'6225768219286018',
      '3':'200000',
      '4':'000000000001',
      '11':'000143',
      '22':'072',
      '23':'0002',
      '25':'00',
      '35':'2B0DE1E4DF38B4A88708FED501C86716',
      '37':'062812773995',
      '41':'87043469',
      '42':'85735017011M594',
      '49':'156',
      '53':'0610000000000000',
      '60':'22000006000601',
      '63':'303030',
      '64':'C8036C9519069870'
    },
    'CancelCardPay':{
      '0':'0200',
      '2':'6225768219286018',
      '3':'200000',
      '4':'000000000001',
      '11':'000146',
      '22':'072',
      '23':'0002',
      '25':'00',
      '35':'2B0DE1E4DF38B4A88708FED501C86716',
      '37':'062812772871',
      '41':'87043469',
      '42':'85735017011M594',
      '49':'156',
      '53':'0610000000000000',
      '60':'23000006000601',
      '61':'000006000144',
      '64':'76E03E8DC1D86AF9'
    },
    'AuthPay':{
      '0':'0100',
      '2':'6225768219286018',
      '3':'030000',
      '4':'000000000900',
      '11':'000349',
      '22':'072',
      '23':'0002',
      '25':'00',
      '35':'A02F806B8DE43EF1861AAF81E6C4EB66',
      '41':'10043725',
      '42':'85735017011M623',
      '49':'156',
      '53':'0610000000000000',
      '55':'9F260857903895D2BF8EC89F2701809F101307010103A00000040A01000000000073EAE7A49F3704F08903F59F3602036B950500000000009A032406269C01039F02060000000009005F2A02015682027C009F1A0201569F03060000000000009F3303E0E9C89F3501229F1E0830303030303030318408A0000003330101029F090200209F410400000001',
      '59':'A2340102040212N7NL0008826105082.5.16  ',
      '60':'10000006000601',
      '64':'591DB99A600A9098'
    },
    'AuthPayFinish':{
      '0':'0200',
      '2':'6225768219286018',
      '3':'000000',
      '4':'000000000500',
      '11':'000350',
      '22':'072',
      '23':'0002',
      '25':'06',
      '35':'A02F806B8DE43EF1861AAF81E6C4EB66',
      '38':'090514',
      '41':'10043725',
      '42':'85735017011M623',
      '49':'156',
      '53':'0610000000000000',
      '60':'2000000600060',
      '61':'0000000000000626',
      '64':'4DAD234D7CB0B4CA'
    },
    'CancelAuthPayFinish':{
      '0':'0200',
      '2':'6225768219286018',
      '3':'200000',
      '4':'000000000500',
      '11':'000353',
      '22':'012',
      '25':'06',
      '37':'062612755429',
      '38':'090514',
      '41':'10043725',
      '42':'85735017011M623',
      '49':'156',
      '61':'0000060003500626',
      '64':'BEFB75B327AA8008'
    },
    'CancelAuthPay':{
      '0':'0100',
      '2':'6225768219286018',
      '3':'200000',
      '4':'000000000001',
      '11':'000348',
      '22':'072',
      '23':'0002',
      '25':'06',
      '35':'A02F806B8DE43EF1861AAF81E6C4EB66',
      '38':'192612',
      '41':'10043725',
      '42':'85735017011M623',
      '49':'156',
      '53':'0610000000000000',
      '60':'1100000600060',
      '61':'0000000000000625',
      '64':'E9A5D7B708BE0F79'
    },
    'EelectronicSign':{
      '0':'0920',
      '2':'6225768219286018',
      '4':'000000000500',
      '11':'000350',
      '15':'0626',
      '37':'062612755429',
      '41':'10043725',
      '42':'85735017011M623',
      '55':'FF0017C9CCBBA7BEADD3AAC3FBB3C632BAC5C3BBD3D0C9A8C2EBFF0112D4A4CADAC8A8CDEAB3C9A3A8C7EBC7F3A3A9FF02020001FF030B3438353730303030202020FF040B3033303830303030202020FF05023106FF060720240626091124FF0706303930353134FF0A03313536FF300F556E696F6E50617920437265646974FF2208A000000333010102FF6406303930353134FF700102',
      '60':'07000006800',
      '62':'00000100000000ED0000004F000000020800031CFF02FF02FF02FF02FF02FF02FF02FF02FF02FF02FF02FF02FF02C4D5FCFF0239B16EF0AFFF0249127D81FF02090B04FF02C5B88266A4A21B0EF23FFF008F2C2E4A246EE5F0D99EC54020FF02B08BAF078B7E3ED1AFA85C50B8BBDD0CF5DAFF02839084EA49680148FEA3EA85A6FB31104AFF0229F67BBEAAF6D46710CD23CC46FF021017F022F0A2B572480815C1A985284B40FF020682297D9D0A06955305CE0D41A0FF02C15C578CFF02FF02FF02FF02FF02FF02FF02FF02FF02FF02FF02FF02FF02FF02FF02FF02FF02',
      '64':'35D94A42ABBEB039'
    },
    'PosRegister':{
      '0':'0800',
      '11':'000362',
      '41':'10043725',
      '42':'85735017011M623',
      '46':'NLP200004008||119.410979,26.018255|N7NL00088261',
      '57':'FC011',
      '60':'00000006004',
      '63':'30303120'
    },
    'QryAcBalance':{
      '0':'0200',
      '2':'6225768219286018',
      '3':'310000',
      '11':'000168',
      '22':'072',
      '23':'0002',
      '25':'00',
      '35':'A55B01245B8FE516022C913F87E7CEE9',
      '41':'87043469',
      '42':'85735017011M594',
      '49':'156',
      '53':'0610000000000000',
      '55':'9F2608EBD5E13DB8D811699F2701809F101307010103A00000040A0100000000005BA6EF289F370488116E7A9F36020394950500000000009A032406299C01319F02060000000000015F2A02015682027C009F1A0201569F03060000000000009F3303E0E9C89F3501229F1E0830303030303030318408A0000003330101029F090200209F410400000001',
      '60':'0100000600060',
      '64':'702A7796FCE6C46A'
    },
    'ReversalCardPay':{
      '0':'0400',
      '2':'6225768219286018',
      '3':'000000',
      '4':'000000000300',
      '11':'000355',
      '22':'072',
      '25':'00',
      '39':'A0',
      '41':'10043725',
      '42':'85735017011M623',
      '49':'156',
      '55':'950500000000009F1E0830303030303030319F101307010103A00000040A0100000000007940DC30',
      '60':'22000006000601',
      '64':'8E2AF0CAF29CC97E'
    }
  }
)

const options = ['CardPay', 'CardPayRtn', 'CancelCardPay', 'AuthPay', 'AuthPayFinish', 'CancelAuthPayFinish', 'CancelAuthPay', 'EelectronicSign', 'PosRegister', 'QryAcBalance', 'ReversalCardPay']
//域描述
function description(index: any){
  switch(index){
    case '0':
      return '报文类型';
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

//复制操作
function copy() {
  if(errorMessage.value.length>0){
    let content = errorMessage.value

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

//变化交易类型
function change(s){
  text.value = s
  params.value = optionParam.value[s]
}

//默认是第一个
params.value = optionParam.value['CardPay']

</script>
<template >
  <div class="switch">
    <el-button @click="back()">返回</el-button>
    <!-- <el-switch class="button" v-model="switchFlag"/> -->
  </div>

  <div class="custom-style">
    <el-segmented v-model="text" :options="options"  @change="change"/>
  </div>

<div class="middle">
  <div class="item-left" :class="!switchFlag ? 'result-style1' : 'result-style2'">
    <div v-for="(item,index) in param" :key="index">
      {{ item }}:{{ description(item) }} <el-input v-model="params[item]" clearable style="width: 180px" />
    </div>
  </div>

  <div class="item-mid">
    <el-button @click="submit()">转换=></el-button>
    <el-button @click="reback()">&lt;=转换</el-button>
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
    <div class="header-left code-container">
      <el-input type="textarea" class="textarea" v-model="errorMessage"
          style="" input-style="background-color: rgb(73, 70, 92);color: white;overflow-y: 0;border-radius: 17px;padding: 1rem;box-shadow: none;height:600px"
          :rows="30"/>
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

  .custom-style{
    width: 400px;
    display: flex;
    flex-wrap: wrap;
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
    position: relative;
    float: left;
    padding: 1rem;
    width: 490px;
    color: white;
    text-align: left;
    top: -10rem;
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
    overflow-wrap: break-word;
    
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
