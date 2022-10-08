<template>
  <div>
    <el-dialog
      custom-class="dialog-container"
      title="货道设置"
      width="940px"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <!-- 主体容器 -->
      <div class="channel-dialog-wrapper">
        <!-- 头部 -->
        <div class="channel-basic">
          <span v-if="currentPageRecord.type" class="vm-row">货道行数：{{ currentPageRecord.type.vmRow }}</span>
          <span v-if="currentPageRecord.type" class="vm-col">货道列数：{{ currentPageRecord.type.vmCol }}</span>
          <span v-if="currentPageRecord.type" class="channel-max-capacity">货道容量（个）：{{
            currentPageRecord.type.channelMaxCapacity }}</span>
          <el-button type="primary" @click="smartRank">智能排货</el-button>
        </div>
        <!-- 货道主体 -->
        <el-scrollbar class="scrollbar">
          <el-row
            v-for="(item,index) in details"
            :key="index"
            ref="scrollbarRef"
            class="space"
            type="flex"
            style="margin-left: -8px; margin-right: -8px;"
          >
            <el-col v-for="(goods,num) in item" :key="num" :span="12" style="padding-left: 8px; padding-right: 8px;">
              <div class="item">
                <div class="code">{{ goods.channelCode }}</div>
                <div class="sku">
                  <img
                    :src="(goods.sku && goods.sku.skuImage) || 'data:image/png;base64,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'"
                    alt="">
                  <div class="name">{{ (goods.sku && goods.sku.skuName) || "暂无商品" }}</div>
                </div>
                <div class="btns">
                  <el-button type="text" class="add" @click="addGoods(goods.channelCode)">添加</el-button>
                  <el-button type="text" :class="['del',{forb:!goods.sku}]" :disabled="!goods.sku" @click="goods.sku=''">删除</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-scrollbar>
        <svg-icon icon-class="zuojiantou" class="arrow-left" />
        <svg-icon icon-class="youjiantou" class="arrow-right" />
        <!-- footer区域 -->
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="confirm" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 智能排货弹出层 -->
    <el-dialog
      custom-class="rankdialog-container"
      title="智能排货"
      width="858px"
      :visible="smartRankVisible"
      :before-close="close"
      append-to-body
    >
      <div class="top-dialog-wrapper">
        <div class="tips">该区域属于{{ businessArea }}商圈适合销售以下商品：</div>
        <el-row style="margin-left: -10px; margin-right: -10px;">
          <el-col
            v-for="(item,index) in top10"
            :key="index"
            :span="4.8"
            style="padding-left: 10px;
            padding-right: 10px;"
          >
            <div class="item">
              <div class=" sku space">
                <img :src="item.image" alt="">
                <div class="name">{{ item.skuName }}</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="accept" type="primary" @click="close">采纳建议</el-button>
      </div>
    </el-dialog>
    <!-- 添加商品弹出层 -->
    <el-dialog
      custom-class="addGoodsdialog-container"
      title="选择商品"
      width="858px"
      :visible="addGoodsVisible"
      :before-close="closeGoods"
      append-to-body
    >
      <div class="select-sku-dialog-wrapper">
        <el-form class="search" label-width="85px">
          <el-form-item label="商品名称：">
            <el-row type="flex" justify="space-between">
              <el-col :span="24">
                <el-input
                  v-model="value"
                  placeholder="请输入"
                  class="sku-name"
                  clearable
                />
              </el-col>
              <el-col :span="24">
                <el-button type="primary" icon="el-icon-search" @click="searchGoods">查询</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <el-scrollbar class="scrollbar">
          <el-row style="margin-left: -10px; margin-right: -10px;">
            <el-col
              v-for="(item,index) in skuList"
              :key="index"
              :span="4.8"
              style="padding-left: 10px; padding-right: 10px;"
            >
              <div class="item1" @click="selectGoods(item,index)">
                <div class=" sku1 space1">
                  <img v-show="selectId===index" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAACQ0lEQVRYR83YP2gTURzA8e8vTSwUEXRQcFHXTiJ10EFcOrQIHQodCiZRCy46uIWmaKSJHRyETBWhSa2IEMGKuAiCRXHWxUGcHAQHhwZqaJLeT15IRNPk8ufe5XLju/fnc793v/fenSxk9FhVeagwCYwR4KVCSuJp3VSYCdBRG9pgHiflrsTSujMMkTEYAzMgDTI6jcg0DFZBCiWBCnCom4dsxtiO0BcnzNRIhTMqvOgEaoWxBhLhfTnEzMFddssR3qly1g3UDmMHJDyXCpd3xqmMfWUTuNQvxgYoe6rKrVRKnHhGV1W57gXjBeSIkMgn5b7pJJbRJEraK6YlSOClwk9gAQi1GKQswpV8Up6ae9G0xoCcgLQDub0zzW32pX0oxMXcomzFl3VahQ3gyD+NthFm15Py1pTFMzqpymsgYgPTbso+/f7F+cIDKcVX9KTuUQAmUH6MKNNrt+VzHXNalS23NaeXyLgujAJr+SW5ZipNZXX0aJElJ8yjjYR8N2XzaT0RET6iHLcVmc4rdYir64uSax5wfkUPH9jjg8K4bYxrlpltwHE496Q+RabyzayOFou8AS74gemY9grfSmEmCgnZRlVi93iGMucXpiOoVgFeUSWqYZaBG35iugK5LXaNe/1kU7t+PR8/bGI8R8g2xhPID0zfIL8wfYH8xPQM8hvTE2gQmK5Bg8J0BRokpiNo0Bj33b7+rd3N1mGzTsutI4jItD2gBYnZN2VBY/4DDQPmL2hYMDVQNKN3Gj+LbGZLv339Abi3VpXvOoUQAAAAAElFTkSuQmCC" alt="" class="selected">
                  <img :src="item.skuImage" alt="">
                  <div class="name">{{ item.skuName }}</div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-scrollbar>
        <svg-icon icon-class="zuojiantou" class="arrow-left disabled" @click="left" />
        <svg-icon icon-class="youjiantou" class="arrow-right" @click="right" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button :class="['confirm',{forbb:selectId===''}]" class="confirm" type="primary" :disabled="selectId===''" @click="closeGoods">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { channelDetailsAPI, getBusinessListAPI, businessTop10API, SearchSkuAPI } from '@/api/equipment'
export default {
  name: 'ChannelDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      smartRankVisible: false,
      addGoodsVisible: false,
      currentPageRecord: {},
      details: {
        channel1: [],
        channel2: [],
        channel3: [],
        channel4: [],
        channel5: [],
        channel6: []
      },
      businessArea: '',
      top10: [],
      skuList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      value: '',
      selectId: '',
      sku: {
        skuName: '',
        skuImage: ''
      },
      channelCode: ''
    }
  },
  mounted() {
  },
  methods: {
    handleClose() {
      this.$emit('update:dialog-visible', false)
    },
    async getChannelDetails() {
      const { data } = await channelDetailsAPI(this.currentPageRecord.innerCode)
      data.forEach(item => {
        if (item.channelCode.substring(0, 1) === '1') {
          this.details.channel1.push(item)
        } else if (item.channelCode.substring(0, 1) === '2') {
          this.details.channel2.push(item)
        } else if (item.channelCode.substring(0, 1) === '3') {
          this.details.channel3.push(item)
        } else if (item.channelCode.substring(0, 1) === '4') {
          this.details.channel4.push(item)
        } else if (item.channelCode.substring(0, 1) === '5') {
          this.details.channel5.push(item)
        } else if (item.channelCode.substring(0, 1) === '6') {
          this.details.channel6.push(item)
        }
      })
    },
    async smartRank() {
      this.smartRankVisible = true
      const { data } = await getBusinessListAPI()
      this.businessArea = data[this.currentPageRecord.businessId].name
      const res = await businessTop10API(this.currentPageRecord.businessId)
      this.top10 = res.data
    },
    close() {
      this.smartRankVisible = false
    },
    async addGoods(channelCode) {
      this.addGoodsVisible = true
      const { data } = await SearchSkuAPI()
      this.skuList = data.currentPageRecords
      this.totalPage = data.totalPage
      this.channelCode = channelCode
    },
    closeGoods() {
      this.addGoodsVisible = false
      this.selectId = ''
      Object.values(this.details).map(item => {
        item.map(val => {
          if (val.channelCode === this.channelCode) {
            val.sku = this.sku
          }
          return val
        })
        return item
      })
    },
    async right() {
      this.pageIndex++
      if (this.pageIndex >= this.totalPage) {
        this.pageIndex = this.totalPage
      }
      const { data } = await SearchSkuAPI(this.pageIndex, this.pageSize)
      this.skuList = data.currentPageRecords
    },
    async left() {
      this.pageIndex--
      if (this.pageIndex < 0) {
        this.pageIndex = 1
      }
      const { data } = await SearchSkuAPI(this.pageIndex, this.pageSize)
      this.skuList = data.currentPageRecords
    },
    async searchGoods() {
      const { data } = await SearchSkuAPI(null, this.pageSize, this.value)
      this.skuList = data.currentPageRecords
    },
    selectGoods(item, index) {
      this.selectId = index
      this.sku.skuName = item.skuName
      this.sku.skuImage = item.skuImage
    }
  }

}
</script>

<style lang="scss">
.dialog-container {
  .channel-dialog-wrapper {
    position: relative;
    width: 847px;
    margin: 0 auto;

    .channel-basic {
      display: flex;
      align-items: center;
      width: 847px;
      height: 56px;
      margin-bottom: 16px;
      background: #f3f6fb;

      .vm-row {
        margin-left: 43px;
      }

      .vm-col {
        margin-left: 55px;
      }

      .channel-max-capacity {
        flex: 1;
        margin-left: 54px;
      }

      .el-button {
        margin-right: 22px;
        display: inline-block;
      }

      .confirm {
        min-width: 80px;
        height: 36px;
        padding: 0px;
        background-color: rgb(95, 132, 255);
        border: none;
      }
    }

    .scrollbar {
      width: 814px;
      height: 384px;
      margin: 0 auto;
    }

    .svg-icon {
      position: absolute;
      top: 50%;
      width: 50px !important;
      height: 50px !important;
    }

    .svg-icon.arrow-left {
      left: -45px;
    }

    .svg-icon.arrow-right {
      right: -45px;
    }

    .scrollbar>div {
      overflow-x: hidden;
    }

    .space {
      margin-bottom: 20px;

      .item {
        position: relative;
        width: 150px;
        height: 180px;
        background: #fff;
        box-shadow: 0 2px 4px 0 rgb(0 0 0 / 6%);
        border-radius: 4px;
        text-align: center;

        .code {
          position: absolute;
          top: 10px;
          left: 0;
          width: 43px;
          height: 23px;
          line-height: 23px;
          background: #829bed;
          border-radius: 0 10px 10px 0;
          font-size: 12px;
          color: #fff;
        }

        .sku {
          height: 135px;
          padding-top: 16px;
          background-color: #f6f7fb;
          border-radius: 4px;

          img {
            display: inline-block;
            width: 84px;
            height: 78px;
            margin-bottom: 10px;
            object-fit: contain;
          }

          .name {
            padding: 0 16px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }

        .btns {
          .add {
            color: rgb(95, 132, 255);
          }

          .del {
            color: rgb(255, 90, 90);
          }

          .forb {
            color: rgb(255, 218, 218);
          }
        }
      }
    }

    .el-dialog__footer {
      padding-top: 0;
      padding-bottom: 40px;

      .dialog-footer {
        padding: 0;
        text-align: center;

        .el-button {
          display: inline-block;
        }

        .confirm {
          width: 80px !important;
          height: 36px;
          background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
          border: none;

          span {
            color: #fff;
          }
        }
      }
    }
  }
}

.rankdialog-container {
  border-radius: 10px;

  .el-dialog__body {
    padding: 30px 20px;

    .top-dialog-wrapper {
      width: 750px;
      margin: 0 auto;

      .tips {
        margin-bottom: 16px;
      }

      .item {
        .space {
          margin-bottom: 20px;
        }

        .sku {
          width: 134px;
          height: 134px;
          padding-top: 16px;
          background-color: #f6f7fb;
          box-shadow: 0 2px 4px 0 rgb(0 0 0 / 6%);
          border-radius: 4px;
          text-align: center;

          img {
            display: inline-block;
            width: 83px;
            height: 84px;
            margin-bottom: 5px;
            object-fit: contain;
            border-style: none;
          }
        }
      }
    }
  }

  .el-dialog__footer {
    padding-top: 0;
    padding-bottom: 40px;

    .dialog-footer {
      padding-top: 0;
      text-align: center;

      .el-button {
        display: inline-block;
      }

      .accept {
        width: 80px !important;
        height: 36px;
        padding: 0;
        background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
        border: none;
      }

    }
  }
}

.addGoodsdialog-container {
  border-radius: 10px;

  .el-dialog__header {
    .el-dialog__title {
      line-height: 22px;
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }
  }

  .el-dialog__body {
    padding: 20px 20px 30px;
    color: #666;

    .select-sku-dialog-wrapper {
      position: relative;
      width: 750px;
      margin: 0 auto;

      .svg-icon {
        position: absolute;
        top: 50%;
        width: 50px !important;
        height: 50px !important;
      }
      .disabled {
        color: #d8dde3;
      }

      .svg-icon.arrow-left {
        left: -45px;
      }

      .svg-icon.arrow-right {
        right: -45px;
      }

      .search {
        margin-bottom: 37px;

        .el-form-item {
          margin-bottom: 0;

          .el-form-item__label {
            line-height: 36px;
            text-align: right;
            vertical-align: middle;
            float: left;
            font-size: 14px;
            color: #606266;
            padding: 0 12px 0 0;
            box-sizing: border-box;
          }

          .el-form-item__content {
            width: 396px;
            line-height: 36px;
            position: relative;
            font-size: 14px;

            .el-row {
              .el-col {
                .sku-name {
                  margin-right: 16px;
                  width: 314px;
                }

                .el-input {
                  position: relative;
                  font-size: 14px;
                  display: inline-block;
                }
              }
            }
          }
        }
      }

      .scrollbar>div {
        overflow-x: auto;
      }

      .el-row {
        position: relative;

        .item1 {
          position: relative;
          .space1 {
            margin-bottom: 20px;
          }

          .sku1 {
            width: 134px;
            height: 134px;
            padding-top: 16px;
            background-color: #f6f7fb;
            box-shadow: 0 2px 4px 0 rgb(0 0 0 / 6%);
            border-radius: 4px;
            text-align: center;

            img {
              display: inline-block;
              width: 83px;
              height: 84px;
              margin-bottom: 5px;
              object-fit: contain;
              border-style: none;
            }
            .selected {
              position: absolute;
              width: 36px;
              height: 36px;
              top: 0;
              left: 0;
            }
          }
        }
      }
    }
  }

  .el-dialog__footer {
    padding-top: 0;
    padding-bottom: 40px;

    .dialog-footer {
      padding-top: 0;
      text-align: center;

      .el-button {
        display: inline-block;
      }

      .confirm {
        width: 80px !important;
        height: 36px;
        padding: 0;
        background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
        border: none;
      }
      .forbb {
        background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
        opacity: 0.3;
      }
    }
  }
}
</style>
