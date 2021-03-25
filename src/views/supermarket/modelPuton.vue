<template>
    <div class="modelPuton">
        <div class="main">
            <div class="tit">添加模型</div>
            <div class="item">
                <label for="modelName" style="flex:1;">模型名称</label>
                <input style="flex:1;" type="text" id="modelName">                
            </div>
            <div class="item">
                <label for="modelPerson" style="flex:1;">指派的模型开发人员</label>
                <input style="flex:1;" type="text" id="modelPerson">
            </div>
            <div class="item">
                <div style="flex:1;"></div>
                <div style="flex:1;">
                    <div class="cancel">取消</div>
                    <div class="confirm">确定</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"modelPuton",
    data(){
        return{

        }
    },
    methods:{

    }
}
</script>

<style scoped lang="less">
.modelPuton{
    height: 91%;
    display: flex;
    align-items: center;
    justify-content: center;
    .tit{
        text-align: center;
        font-family: MicrosoftYaHei-Bold;
        font-size: 20px;
        color: #000000;
    }
    .main{
        width: 880px;
        height: 514px;
        background-image: url("../../assets/bg.png");
        background-size: cover;
    }
    .item{
        display: flex;
        justify-content: center;
        label{
            text-align: right;
        }
        input{
            background: #FFFFFF;
            border: 1px solid #FFFFFF;
            border-radius: 4px;
        }
    }
}
</style>