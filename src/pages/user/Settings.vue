<template>
  <div class="settings">
    <SubHeader title="Settings"></SubHeader>
    <div class="main">
      <div class="container">
        <el-form label-position="left" label-width="170px">
          <el-form-item label="Email address:">{{ email }}</el-form-item>
          <el-form-item label="Password:">
            <el-input
              v-model="oldPassword"
              :disabled="!isPasswordEditable"
              placeholder="Old password"
              show-password
            >
              <el-button
                slot="append"
                class="lock"
                @click="togglePasswordEditor"
              >
                <svg-icon
                  :icon-class="isPasswordEditable ? 'unlock' : 'lock'"
                ></svg-icon>
              </el-button>
            </el-input>
            <el-collapse-transition>
              <div v-show="isPasswordEditable" class="new-password">
                <el-input
                  v-model="newPassword"
                  placeholder="New password"
                  show-password
                ></el-input>
                <el-input
                  v-model="confirmPassword"
                  placeholder="Confirm new password"
                  show-password
                ></el-input>
              </div>
            </el-collapse-transition>
          </el-form-item>
          <el-form-item>
            <el-row :gutter="12" justify="space-between" type="flex">
              <el-col :span="12">
                <el-button
                  :disabled="!isPasswordEditable"
                  class="full-width"
                  type="primary"
                  @click="updatePassword"
                  >Confirm</el-button
                >
              </el-col>
              <el-col :span="12">
                <el-button
                  class="full-width"
                  plain
                  @click="
                    () => {
                      $router.go(-1)
                    }
                  "
                  >Cancel</el-button
                >
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item></el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import SubHeader from '@/components/SubHeader'
import api from '@/api'
export default {
  components: {
    SubHeader
  },
  data() {
    return {
      isPasswordEditable: false,

      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  },
  computed: {
    email() {
      return this.$store.getters.user.email
    }
  },
  methods: {
    togglePasswordEditor() {
      this.isPasswordEditable = !this.isPasswordEditable
    },
    async updatePassword() {
      if (this.oldPassword === '') {
        return this.$message.error('Old password is Empty')
      }
      if (this.newPassword === '') {
        return this.$message.error('New password is Empty')
      }
      if (this.newPassword.length < 6) {
        return this.$message.error('New password must be at last 6 character')
      }
      if (this.confirmPassword === '') {
        return this.$message.error('Please confirm your new password')
      }
      if (this.newPassword !== this.confirmPassword) {
        return this.$message.error('Please confirm your new password')
      }

      const userId = this.$store.getters.user.id
      const res = await api.updatePassword(
        userId,
        this.newPassword,
        this.oldPassword
      )
      if (res.data.error_code === 0) {
        this.$message.success('密码修改成功！')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.settings {
  .main {
    padding: 30px;
    .container {
      width: 440px;
      margin: 60px auto 0;
      text-align: left;
      /deep/ .el-form-item__label {
        color: #303133;
        font-weight: 600;
      }

      .lock {
        font-size: 20px;
        stroke: #606266;
      }
      .new-password {
        .el-input {
          margin-top: 10px;
        }
      }

      .el-select {
        width: 100%;
        /deep/ .el-input__suffix {
          right: 68px;
        }
      }

      .append {
        background-color: #f5f7fa;
        position: absolute;
        height: 40px;
        width: 64px;
        top: 0px;
        right: 0px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        display: table-cell;
        vertical-align: middle;
        border-color: #dcdfe6 !important;
        .svg-icon {
          transform: translateY(-3px);
        }
      }
    }
  }
}
</style>
