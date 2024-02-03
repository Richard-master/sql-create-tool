<template>
  <div>
    <div id="footer" class="container-fluid">
      <div id="pc-content" class="pc-content pc-show">
        <div class="menu">
          <a class="menu-item menu-item-box" :href="item.path" v-for="item in navigation">
            <img width="16" height="16" src="@/assets/imgs/用户.png">
            <h3 class="item-text">{{ item.name }}</h3>
          </a>
        </div>
      </div>
      <div class="pc-copyright pc-show">
        <div class="bot-copyright">
          Copyright
          <span role="img" aria-label="copyright" class="anticon anticon-copyright"><svg viewBox="64 64 896 896"
                                                                                         focusable="false"
                                                                                         data-icon="copyright"
                                                                                         width="1em" height="1em"
                                                                                         fill="currentColor"
                                                                                         aria-hidden="true"><path
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm5.6-532.7c53 0 89 33.8 93 83.4.3 4.2 3.8 7.4 8 7.4h56.7c2.6 0 4.7-2.1 4.7-4.7 0-86.7-68.4-147.4-162.7-147.4C407.4 290 344 364.2 344 486.8v52.3C344 660.8 407.4 734 517.3 734c94 0 162.7-58.8 162.7-141.4 0-2.6-2.1-4.7-4.7-4.7h-56.8c-4.2 0-7.6 3.2-8 7.3-4.2 46.1-40.1 77.8-93 77.8-65.3 0-102.1-47.9-102.1-133.6v-52.6c.1-87 37-135.5 102.2-135.5z"></path></svg></span>
          {{ copyright }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer1",
  data() {
    return {
      showQR: true // 控制是否显示微信二维码
    }
  },
  props: {
    navigation: {
      type: Array,
      default: function () {
        return []
      },
      required: true
    },
    copyright: {
      type: String,
      default: function () {
        return ""
      },
      required: true
    }
  },
  methods: {
    showQRCode() {
      this.showQR = true;
    },
    hideQRCode() {
      this.showQR = false;
    },
    routerTo(path) {
      this.navigation.forEach(item => {
        if (item.path == path) {
          item.active = true
        } else
          item.active = false
      })
      this.$router.replace(path).catch(err => err)
    }
  }
}
</script>


<style scoped>
.social-icon {
  position: relative;
  display: inline-block;
}

.wechat-qrcode {
  position: absolute;
  top: 0px;
  left: 0px; /* 初始时位于图片下方 */
  transform: translateY(-50%);
  transition: left 2s ease; /* 过渡效果 */
  opacity: 0; /* 可以根据需要调整显示效果 */
}

.social-icon:hover .wechat-qrcode {
  left: 50px; /* 鼠标移入时微信二维码向上移动 */
  opacity: 1;
}

a {
  text-decoration: none;
}

#footer {
  width: 100%;
  color: #7a7a7a;
  background: #efefef;
  overflow: hidden;
}

#footer .pc-content {
  margin: 20px auto 0;
  max-width: 1200px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

#footer .pc-content .menu {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding-right: 20px;
}

#footer .menu {
  text-align: center;
}

div {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

#footer .pc-content .menu-item-box {
  margin-right: 80px;
  display: flex;

}

#footer .pc-content .menu .menu-item h3.item-text {
  margin-bottom: 10px;
}

#footer .pc-content .menu .menu-item .item-text {
  position: relative;
  height: 30px;
  font-size: 14px;
}

.item-text:hover {
  cursor: pointer;
}

#footer .pc-content .menu-item h3 {
  color: #4d5d81;
}

#footer .pc-content .service {
  border-left: 2px solid #dcdddd;
  padding-left: 50px;
  color: #898989;
  font-size: 14px;
}

#footer .social-icon {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

#footer .pc-content .service a {
  color: #898989;
}

#footer .social-icon a {
  margin-right: 20px;
  position: relative;
  cursor: pointer;
}

.pc-copyright {
  margin: 0 auto;
  max-width: 1200px;
  height: 48px;
  line-height: 48px;
  font-size: 12px;
  font-family: "SourceHanSansCN-Regular", "PingFangSC-Regular";
  font-weight: 300;
  color: #242424;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.pc-copyright .bot-copyright {
  text-align: center;
  opacity: .7;
}

</style>
