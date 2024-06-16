<script setup lang="ts">
import { ref } from 'vue'

const menu = ref([
  { 
    name: '8583转换',
    url: '/data8583',
  },
  { 
    name: '参数转换',
    url: '/param',
  },
  { 
    name: 'Json美化',
    url: '/json',
  },
  { 
    name: 'Url转码',
    url: '/decode',
  },
  { 
    name: '进制转换',
    url: '/binary',
  },
  { 
    name: '图片转16进制',
    url: '/changeImg',
  },
  { 
    name: '16进制转图片',
    url: '/toImg',
  },
  
])

</script>

<template>
  <h2>请选择你需要的进入的功能</h2>
  <div class="container">
    <template v-for="item in menu">
      <router-link class="box" href="#" :to="item.url">
        <!-- <div  > -->
          {{ item.name }}
        <!-- </div> -->
      </router-link>
    </template>
    
  </div>


</template>

<style scoped>
.read-the-docs {
  color: #888;
}
html{
  background-color: #e8e8e8;
}

.container {
  display: flex;
  height: 80%;
  padding: 1rem;
  background-color: #24233b;
  align-items: center;
  text-align: center;
  justify-content: center;
  /* background-image: url('https://picsum.photos/1080');
  background-blend-mode: overlay;
  background-size: cover, contain;
  background-repeat: no-repeat, no-repeat;
  background-position: center, center; */
}

.box {
  background-color: #49465c;
  margin: 1rem;
  width: 5rem;
  height: 5rem;
  align-items: center;
  display: flex;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  color: white;

}
</style>
