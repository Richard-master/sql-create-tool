<script setup lang="ts">
import {ref} from "vue";

defineProps<{
  msg: string
}>()

const activeKey = ref(['1']);

</script>

<template>
  <div class="greetings" style="max-width: 80%;margin: 0 auto">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      解决问题：
    </h3>
    <p>在建表时，英语不好的程序员常常需要频繁的去翻译字段并来回粘贴，建表体检不好。</p>
    <p> 为了解决这个问题，我开发了这个工具，程序员只需要写好表和字段的注释（中文），点击一键翻译，即可调用百度翻译API进行翻译，并且可以一键生成建表的SQL语句。</p>
    <h3>
      操作说明：
    </h3>
    <a-collapse v-model:activeKey="activeKey">
      <a-collapse-panel key="1" header="SQL生成">
        <p>
          1.在SQL生成里面，输入表注释、字段注释、字段类型等信息（根据SQL基础知识和建表需求）后，点击一键翻译按钮会对表名、字段名使用百度翻译API进行翻译并显示出来</p>
        <p>注：尽量写5个字段翻译一次，API免费的，有并发限制。后续会更改代码逻辑，自动根据数量控制并发。</p>
        <img alt="Vue logo" class="logo" src="@/assets/project-img/sqlcreate.png" style="max-width: 80%"/>
        <img alt="Vue logo" class="logo" src="@/assets/project-img/sqlcreate1.png" style="max-width: 80%"/>
        <p>2.在执行完成翻译任务后，</p>
        <img alt="Vue logo" class="logo" src="@/assets/project-img/sqlcreate2.png" style="max-width: 80%"/>
      </a-collapse-panel>
      <a-collapse-panel key="2" header="项目管理">
        <p>2.点击项目管理，进入项目信息页面，可以查看所有项目信息，并进一步查看项目所包含的表信息。</p>
        <p>输入数据库名称，点击翻译按钮会翻译对应的数据库名称</p>
        <img alt="Vue logo" class="logo" src="@/assets/project-img/project.png" style="max-width: 80%"/>
      </a-collapse-panel>
      <a-collapse-panel key="3" header="表大全">

      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
  text-align: center;
  margin-top: 30px;
}

h3 {
  font-size: 1.2rem;
  text-align: center;
}


p {
  text-align: center;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

.green {
  text-decoration: none;
  color: #008a5c;
  transition: 0.4s;
  padding: 3px;
}
</style>
