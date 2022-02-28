<template>
  <transition
    name="dialog-fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave">
    <div
      v-show="visible"
      class="el-dialog__wrapper"
      @click.self="handleWrapperClick">
      <div
        id="box"
        role="dialog"
        :key="key"
        aria-modal="true"
        :aria-label="title || 'dialog'"
        :class="['el-dialog', { 'is-fullscreen': fullscreen, 'el-dialog--center': center }, customClass,'ee-position']"
        ref="dialog"
        :style="style">
        <div class="el-dialog__header">
          <slot name="title">
            <span class="el-dialog__title">{{ title }}</span>
          </slot>
          <button
            type="button"
            class="el-dialog__headerbtn"
            aria-label="Close"
            v-if="showClose"
            @click="handleClose">
            <i class="el-dialog__close el-icon el-icon-close"></i>
          </button>
        </div>
        <div class="el-dialog__body" v-if="rendered"><slot></slot></div>
        <div class="el-dialog__footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Popup from 'element-ui/src/utils/popup';
import Migrating from 'element-ui/src/mixins/migrating';
import emitter from 'element-ui/src/mixins/emitter';

export default {
  name: 'ElDialog',

  mixins: [Popup, emitter, Migrating],

  props: {
    title: {
      type: String,
      default: ''
    },

    modal: {
      type: Boolean,
      default: true
    },

    modalAppendToBody: {
      type: Boolean,
      default: true
    },

    appendToBody: {
      type: Boolean,
      default: false
    },

    lockScroll: {
      type: Boolean,
      default: true
    },

    closeOnClickModal: {
      type: Boolean,
      default: true
    },

    closeOnPressEscape: {
      type: Boolean,
      default: true
    },

    showClose: {
      type: Boolean,
      default: true
    },

    width: String,

    fullscreen: Boolean,

    customClass: {
      type: String,
      default: ''
    },

    top: {
      type: String,
      default: '15vh'
    },
    beforeClose: Function,
    center: {
      type: Boolean,
      default: false
    },

    destroyOnClose: Boolean
  },

  data () {
    return {
      closed: false, key: 0
    };
  },

  watch: {
    visible (val) {
      console.log(11111);
      if (val) {
        this.closed = false;
        this.$emit('open');
        this.$el.addEventListener('scroll', this.updatePopper);
        this.$nextTick(() => {
          this.$refs.dialog.scrollTop = 0;
        });
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
      } else {
        // 关闭的同时恢复弹窗的原样
        let oBox = document.getElementById('box')
        // setTimeout(() => {}, 0)
        oBox.style.left = '500px';
        oBox.style.top = '250px';
        this.$el.removeEventListener('scroll', this.updatePopper);
        if (!this.closed) this.$emit('close');
        if (this.destroyOnClose) {
          this.$nextTick(() => {
            this.key++;
          });
        }
      }
    }
  },

  computed: {
    style () {
      let style = {};
      if (!this.fullscreen) {
        style.marginTop = this.top;
        if (this.width) {
          style.width = this.width;
        }
      }
      return style;
    }
  },

  methods: {
    // move () {
    //   // 获取元素和初始值
    //   let oBox = document.getElementById('box')
    //   let disX = 0
    //   let disY = 0
    //   // 获取浏览器可见区域宽高，div宽高
    //   var browserWidth = document.documentElement.clientWidth
    //   var browserHeight = document.documentElement.clientHeight
    //   var boxWidth = document.getElementById('box').offsetWidth
    //   var boxHeight = document.getElementById('box').offsetHeight
    //   // 容器鼠标按下事件
    //   oBox.onmousedown = function (k) {
    //     var m = k || window.event;
    //     console.log(m.clientX, this.offsetLeft, this);
    //     // 鼠标相对于div左侧位置
    //     disX = m.clientX - this.offsetLeft;
    //     disY = m.clientY - this.offsetTop;
    //     console.log(m.clientX - this.offsetLeft);
    //     document.onmousemove = function (ec) {
    //       var e = ec || window.event;
    //       oBox.style.left = (e.clientX - disX) + 'px';
    //       if ((e.clientX - disX) <= 0) {
    //         oBox.style.left = 0;
    //       } else if ((boxWidth - disX + e.clientX) >= browserWidth) {
    //         oBox.style.left = browserWidth - boxWidth + 'px';
    //       }
    //       oBox.style.top = (e.clientY - disY) + 'px';
    //       if ((e.clientY - disY) <= 0) {
    //         oBox.style.top = 0;
    //       } else if ((boxHeight - disY + e.clientY) >= browserHeight) {
    //         oBox.style.top = browserHeight - boxHeight + 'px';
    //       }
    //     };
    //   }

    //   oBox.onmouseup = function () {
    //     document.onmousemove = null;
    //     document.onmouseup = null;
    //   };
    // },
    getMigratingConfig () {
      return {
        props: {
          'size': 'size is removed.'
        }
      };
    },
    handleWrapperClick () {
      if (!this.closeOnClickModal) return;
      this.handleClose();
    },
    handleClose () {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide);
      } else {
        this.hide();
      }
    },
    hide (cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false);
        this.$emit('close');
        this.closed = true;
      }
    },
    updatePopper () {
      this.broadcast('ElSelectDropdown', 'updatePopper');
      this.broadcast('ElDropdownMenu', 'updatePopper');
    },
    afterEnter () {
      this.$emit('opened');
    },
    afterLeave () {
      this.$emit('closed');
    }
  },

  mounted () {
    if (this.visible) {
      this.rendered = true;
      this.open();
      if (this.appendToBody) {
        document.body.appendChild(this.$el);
      }
    }
    this.move()
  },
  destroyed () {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};
</script>

<style  scoped>
  .ee-position{
    position: absolute;
    margin-top: 0px !important;
    top:250px;
    left: 500px;
}

</style>
