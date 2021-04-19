<template>
    <div class="detail">
        <h1 style="color:#fff;">detail</h1>
    </div>
</template>

<script>
export default {
    name:"detail",
    data(){
        return {

        }
    },
    mounted(){
        console.log(this.$route.params)
    }
}
</script>

<style scoped lang="less">
.detail{

}
</style>