<template>
  <div>
    <a-card style="width: 90%;margin:0 auto;min-height: calc(100vh - 85.8px)">
      <a-table :dataSource="dataSource" :columns="columns">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'projectName'">
            <a-input v-model:value="record.projectName"></a-input>
          </template>
          <template v-if="column.key === 'databaseName'">
            <a-input v-model:value="record.databaseName"></a-input>
          </template>
          <template v-if="column.key === 'action'">
        <span>
          <a class="ant-dropdown-link" @click="translateDatabaseName(record.key,record.projectName)">
            翻译
            <down-outlined/>
          </a>
          <a-divider type="vertical"/>
          <a class="ant-dropdown-link" @click="toTable">
            查看数据表
            <down-outlined/>
          </a>
          <a-divider type="vertical"/>
          <a>删除</a>
        </span>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>
<script setup lang="ts">
import {useRouter} from "vue-router";
import {useTranslate} from '@/assets/translate'
const {translate}  = useTranslate();
const router = useRouter()
let dataSource = [
  {
    key: 1,
    projectName: '房屋租赁',
    databaseName: ''
  },
  {
    key: 2,
    projectName: '绿色骑行',
    databaseName: ''
  },
]
let columns = [
  {
    title: '项目名称',
    dataIndex: 'projectName',
    key: 'projectName',
  },
  {
    title: '数据库名称',
    dataIndex: 'databaseName',
    key: 'databaseName',
  },
  {
    title: '操作',
    key: 'action',
  },
]

/**
 * 跳转到数据库页面
 */
const toTable = () => {
  router.push('/SQLCreate')
}

/**
 * 翻译数据库名称，点击“翻译”按钮后，将数据库名称翻译为数据库表名
 * @param key 下标
 * @param query 项目名称
 */
const translateDatabaseName = (key:number,query:string) => {
  translate(query).then(result => {
    console.log(result);
    if (typeof result === "string") {
      let outputString = ''
      if (result.includes('of')) {
        // 有 'of' 的情况
        let [beforeOf, afterOf] = result.split(' of ');
        outputString = `db_${afterOf}_${beforeOf}`;
      } else {
        // 没有 'of' 的情况
        outputString = `db_${result.toLowerCase().replace(/\s+/g, '_')}`;
      }
      console.log(outputString)
      dataSource[key-1].databaseName = outputString
    }
  }).catch(error => {
    console.error(error);
  });
}
</script>
