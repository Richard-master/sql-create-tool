<template>
  <div style="padding:0 20px;background: #f8fbf8;min-height: calc(100vh - 85.8px)">
    <a-row :gutter="[20,0]">
      <a-col :span="14">
        <a-card title="参数输入" style="width: 100%">
          <a-collapse v-model:activeKey="activeKey">
            <a-collapse-panel :key="table.formState.index" v-for="table in tables">
              <template v-slot:header>
                <a-space>
                  <a-form-item label="表注释">
                    <a-input @click.stop="preventInputClick" v-model:value="table.formState.tableName"/>
                  </a-form-item>
                  <a-form-item label="表名" v-if="table.formState.tableEnglishName!==''">
                    <a-input v-model:value="table.formState.tableEnglishName"/>
                  </a-form-item>
                </a-space>
              </template>
              <template v-slot:extra>
                <a-button @click.stop="deleteTable(table.formState.index)">删除</a-button>
              </template>
              <div v-for="field in table.formState.fields">
                <a-space>
                  <!--                    <span>{{ field.index }}</span>-->
                  <a-form-item label="字段注释">
                    <a-input v-model:value="field.fieldChineseName"/>
                  </a-form-item>
                  <a-form-item v-if="field.fieldName !== ''" label="字段名">
                    <a-input v-model:value="field.fieldName"/>
                  </a-form-item>
                  <a-form-item label="字段类型">
                    <a-select
                        ref="select"
                        v-model:value="field.fieldStyle"
                        style="width: 120px"
                    >
                      <a-select-option value="varchar(255)">字符串varchar(255)</a-select-option>
                      <a-select-option value="int">整形int</a-select-option>
                      <a-select-option value="datetime">日期datetime</a-select-option>
                      <a-select-option value="decimal(10,2)">金额decimal(10,2)</a-select-option>
                      <a-select-option value="text">长文本text</a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item label="非空">
                    <a-checkbox v-model:checked="field.notNull"></a-checkbox>
                  </a-form-item>
                  <a-form-item label="主键">
                    <a-checkbox v-model:checked="field.primaryKey"></a-checkbox>
                  </a-form-item>
                  <a-form-item label="自增">
                    <a-checkbox v-model:checked="field.autoIncrement"></a-checkbox>
                  </a-form-item>
                  <a-form-item>
                    <a-button @click.stop="deleteField(table.formState.index,field.index)">删除</a-button>
                  </a-form-item>
                </a-space>
              </div>
              <a-button style="width: 100%" type="dashed" @click="addField(table.formState.index)">添加字段</a-button>
              <div style="display: flex;justify-content: space-around;margin-top: 20px">
                <a-button style="width: 40%" type="primary" @click="translateAll(table.formState.index)">一键翻译
                </a-button>
                <a-button style="width: 40%" type="primary" @click="createTableSQL(table.formState.index)">生成SQL
                </a-button>
              </div>
            </a-collapse-panel>
          </a-collapse>
          <a-button style="width: 100%;margin-top: 20px" type="dashed" @click="addTable">添加表</a-button>
        </a-card>
      </a-col>
      <a-col :span="10">
        <a-card title="生成结果" style="width: 100%">
          <a-empty v-if="sqlCreate===''">
            <template #description>
              <span>
                请先输入数据，并点击【一键生成】
              </span>
            </template>
          </a-empty>
          <a-collapse v-else activeKey="1">
            <a-collapse-panel key="1">
              <template v-slot:extra>
                <a-button @click.stop="copySQL">复制</a-button>
              </template>
              <codemirror
                  v-model="sqlCreate"
                  placeholder="Code gose here..."
                  :style="{ height: '400px' }"
                  :autofocus="true"
                  :indent-with-tab="true"
                  :tabSize="2"
                  :extensions="extensions"
              />
            </a-collapse-panel>
          </a-collapse>

        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import {Codemirror} from "vue-codemirror";

export default {
  components: {
    Codemirror,
  },
};
</script>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {useTranslate} from '@/assets/translate'
import {javascript} from "@codemirror/lang-javascript";
import {oneDark} from "@codemirror/theme-one-dark";
import {message} from "ant-design-vue";


const {translate} = useTranslate();

let tables = reactive([{
  formState: {
    index: 1,
    tableName: '',
    tableEnglishName: '',
    fields: [{
      index: 1,
      fieldName: '',
      fieldChineseName: '',
      fieldStyle: '',
      notNull: false,
      primaryKey: false,
      autoIncrement: false
    }]
  }
}])
const activeKey = ref([1]);
let sqlCreate = ref('')
const code = ref(``);
const extensions = [javascript(), oneDark];

const deleteTable = (index: number) => {
  console.log(index)
  tables.splice(
      0,
      tables.length,
      ...tables.filter((item) => item.formState.index !== index)
  );
}

const deleteField = (tableIndex: number, fieldIndex: number) => {
  tables[tableIndex - 1].formState.fields = tables[tableIndex - 1].formState.fields.filter(item => item.index !== fieldIndex)
}

const createTableSQL = (index: number) => {
  sqlCreate.value = generateMySQLStatement(tables[index - 1].formState);
}

const preventInputClick = () => {

}

const copySQL = () => {
// Create a textarea element to hold the text to copy
  const textarea = document.createElement('textarea');
  textarea.value = sqlCreate.value;
  document.body.appendChild(textarea);

  // Select the text in the textarea
  textarea.select();
  document.execCommand('copy');

  // Remove the textarea element
  document.body.removeChild(textarea);
  message.success("复制成功")
}

const generateMySQLStatement = (formState: any) => {
  const {tableEnglishName, tableName, fields} = formState;
  // Create table statement

  let sqlStatement = `DROP TABLE IF EXISTS ${tableEnglishName};\n`;

  sqlStatement += `CREATE TABLE ${tableEnglishName} (\n`;

  // Add fields to the statement
  fields.forEach((field: any, index: number) => {
    sqlStatement += `  ${field.fieldName} ${field.fieldStyle}`;

    if (field.notNull) {
      sqlStatement += ' NOT NULL';
    }

    if (field.primaryKey) {
      sqlStatement += ' PRIMARY KEY';
    }

    if (field.autoIncrement) {
      sqlStatement += ' AUTO_INCREMENT';
    }

    if (field.fieldChineseName != '') {
      sqlStatement += ` COMMENT '${field.fieldChineseName}'`;
    }

    if (index < fields.length - 1) {
      sqlStatement += ',\n';
    }
  });

  // Close the CREATE TABLE statement
  sqlStatement += `\n) COMMENT='${tableName}';`;

  return sqlStatement;
}

const translateAll = (index: number) => {
  // 如果没有被翻译，才进行翻译，否则不翻译（为了节省资源）
  if (tables[index - 1].formState.tableEnglishName === '') {
    translateTableName(index, tables[index - 1].formState.tableName)
  }
  tables[index - 1].formState.fields.forEach(item => {
    if (item.fieldName === '') {
      translateFieldName(index, item.index, item.fieldChineseName)
    }
  })
}

/**
 * 添加表
 */
const addTable = () => {
  console.log(tables[tables.length - 1].formState.index)
  tables.push({
    formState: {
      index: tables[tables.length - 1].formState.index + 1,
      tableName: '',
      tableEnglishName: '',
      fields: [{
        index: 1,
        fieldName: '',
        fieldChineseName: '',
        fieldStyle: '',
        notNull: false,
        primaryKey: false,
        autoIncrement: false
      }]
    }
  })
}

const addField = (index: number) => {
  console.log(index)
  tables[index - 1].formState.fields.push({
    index: tables[index - 1].formState.fields[tables[index - 1].formState.fields.length - 1].index + 1,
    fieldName: '',
    fieldChineseName: '',
    fieldStyle: '',
    notNull: false,
    primaryKey: false,
    autoIncrement: false
  })
}

function translateTableName(index: number, query: string) {
  translate(query).then(result => {
    console.log(result);
    if (typeof result === "string") {
      tables[index - 1].formState.tableEnglishName = 'sys_' + result
    }
  }).catch(error => {
    console.error(error);
  });
}

// 翻译
const translateFieldName = (tableIndex: number, index: number, query: string) => {
  translate(query).then(result => {
    console.log(result);
    if (typeof result === "string") {
      // 将字符串转换为小写
      let lowercaseString = result.toLowerCase();
      // 用下划线连接单词
      let formattedString = lowercaseString.replace(/\s+/g, '_');
      tables[tableIndex - 1].formState.fields[index - 1].fieldName = formattedString
    }
  }).catch(error => {
    console.error(error);
  });
}
</script>


