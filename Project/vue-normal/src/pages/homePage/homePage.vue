<template>
  <div class="homePage">
    <h1>Hello World!</h1>
    <p>to day is {{date | stampDate}}</p>
    <p>{{$store.state.sentence}}</p>
  </div>
</template>
<script>
import { homepageInit } from "@/api/";
export default {
  name: "homePage",
  data() {
    return {
      proptitle: "homePage",
      date: new Date()
    };
  },
  created() {
    console.log(homepageInit)
    this.$_axios({
      method: homepageInit.method,
      url: homepageInit.url,
      data: {
        name: "123",
        password: "456",
      }
    }).then(res => {
      console.log(res.data);
    });
  }
};
</script>
<style lang="less" scoped>
</style>

