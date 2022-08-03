<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">OMRON 后台管理系统</span>
                <el-form
                    :model="loginUser"
                    :rules="rules"
                    ref="loginForm"
                    label-width="80px"
                    class="loginForm">

                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="loginUser.username" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button
                            type="primary"
                            class="submit_btn"
                            @click="submitForm('loginForm')">登录</el-button>
                    </el-form-item>

                    <div class="tiparea">
                        <p>还没有账号？现在<router-link to = '/register'>注册</router-link></p>
                    </div>

                </el-form>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'login',
        components: {},
        data() {
            return {
                loginUser: {
                    username: "",
                    password: "",
                },
                rules: {
                    username: [
                        {
                            required: true,
                            message: '用户名不能为空',
                            trigger: 'blur'
                        }, {
                            min: 2,
                            max: 30,
                            message: '长度在2-30个字符之间',
                            trigger: 'blur'
                        }
                    ],
                    password: [
                        {
                            required: true,
                            message: '密码不能为空',
                            trigger: 'blur'
                        }, {
                            min: 6,
                            max: 30,
                            message: '长度在6-30之间',
                            trigger: 'blur'
                        }
                    ],
                }
            }
        },

        methods:{
            submitForm(formName){
                this.$refs[formName].validate(valid => {
                    if(valid){
                        this.$axios.post('http://10.110.133.212:8000/api/login', this.loginUser)
                        .then(res => {
                            console.log(res);
                            // token

                        })
                        this.$router.push('/index')
                    }else{
                        console.log('error submit!!');
                        return false;
                    }
                })
            }
        }
        
    }
</script>

<style scoped="scoped">
    .login {
        position: relative;
        width: 100%;
        height: 100%;
        background: url("../assets/bg.jpg") no-repeat center center;
        overflow-x: hidden;
        overflow-y: hidden;
        background-size: 100% 100%;
    }
    .form_container {
        width: 370px;
        height: 210px;
        position: absolute;
        top: 15%;
        left: 35%;
        padding: 35px;
        border-radius: 5px;
        text-align: center;
    }
    .form_container .manage_tip .title {
        font-family: 'Microsoft Yahei';
        font-weight: bold;
        font-size: 26px;
        color: #fff;
    }
    .loginForm {
        margin-top: 20px;
        background-color: #fff;
        padding: 20px 40px 20px 20px;
        border-radius: 5px;
        box-shadow: 0 5px 10px #cccc;
    }
    .submit_btn {
        width: 100%;
    }
    .tiparea p a {
        color: #409eff;
    }
</style>