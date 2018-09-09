<template>
    <div class="admin">
        <div>
            <label for="account">账户</label>
            <input class="admin__account"
                   type="text"
                   name="account"
                   v-model="user.account">
        </div>
        <div>
            <label for="password">密码</label>
            <input class="admin__password"
                   type="password"
                   name="password"
                   v-model="user.password">
        </div>

        <div>
            <button @click="API_POST_LOGIN">
                登录
            </button>
        </div>
    </div>
</template>

<script>
import { API_POST_LOGIN } from '@/api'
// import userSec from '@/components/userSec'

export default {
    data() {
        return {
            user: {
                title: '',
                content: ''
            }
        }
    },
    components: {},
    created() {
        // API_GET_user({ adminId: this.$route.params.adminId }).then((data) => {
        //     this.admin = data
        // })
    },
    methods: {
        API_POST_LOGIN() {
            API_POST_LOGIN(this.user)
                .then(() => {
                    alert('登录成功')
                    sessionStorage.setItem('loginStatus', 'T')
                    this.$store.commit('login')
                    this.$router.push('homePage')
                })
                .catch((err) => alert(err))
        }
    }
}
</script>

<style lang="less" scoped>
.admin {
    &__title {
        width: 600px;
        padding: 5px;
    }
    &__content {
        padding: 5px;
        margin-top: 30px;
        width: 600px;
        height: 300px;
    }
}
</style>
