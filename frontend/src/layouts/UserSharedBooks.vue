<template>
  <div class="bg mt-10">
    <div class="md:w-1/2">
      <h1
        class="text-xl font-semibold py-5 pl-6 text-gray-900 dark:text-gray-200"
      >
        YOUR SHARED BOOKS
      </h1>
      <h1 class="md:text-sm ml-6 -mt-4 text-gray-500 dark:text-gray-300 mb-10">
        Hello
        <span class="font-semibold">{{
          this.$store.getters.getUserFirstName
        }}</span
        >, Welcome to EBook Web!
      </h1>
    </div>
    <DashboardTab />
  </div>
</template>
                        
<script>
import { defineComponent } from "@vue/runtime-core";
import DashboardTab from "@/components/DashboardTab.vue";
export default defineComponent({
  name: "UserSharedBooks",
  components: { DashboardTab },
  data: () => ({
    //
  }),
});
</script>
            <style scoped>
.bg {
  text-align: left;
  margin-right: 16%;
}
</style>
                        