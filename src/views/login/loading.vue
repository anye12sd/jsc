<template>
    <div class="loading">

    </div>
</template>

<script>
export default {
    name:"loading",
    data(){
        return {
            identity:{
                1:"系统管理员",
                2:"单位管理员",
                3:"普通用户",
                4:"模型开发人员"
            }
        }
    },
    mounted(){
        // 获取身份
    
    }
}
</script>

<style scoped lang="less">
.loading{
    width: 100%;
    height: 100%;
    background-color: #fff;
}
</style>