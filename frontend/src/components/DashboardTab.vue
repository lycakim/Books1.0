<template>
  <div class="bg mt-10 w-full">
    <div class="text-justify px-6">
      <div
        v-if="results <= 0"
        class="border rounded-lg bg-white px-5 py-14 w-full flex"
      >
        <h1 class="text-lg text-gray-500">
          No recent book uploads. Click<a
            class="text-blue-600 cursor-pointer"
            @click="redirect('/user/your-books')"
          >
            here</a
          >
          to upload your book.
        </h1>
      </div>
      <div
        class="border rounded-lg bg-white p-5 w-full my-3 grid grid-cols-2 gap-2"
      >
        <a
          v-for="item in contents"
          :key="item"
          href="javascript:void(0)"
          class="flex flex-col my-2 w-full items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <img
            class="object-cover bg-center w-full rounded-t-lg h-full md:h-48 md:w-48 md:rounded-none md:rounded-s-lg"
            :src="imgUrl(item.cover_image)"
            alt="item.cover_image"
          />
          <div class="flex flex-col justify-between p-4 leading-normal">
            <h5
              class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              {{ item.book_name }}
            </h5>

            <p class="mb-3 font-normal desc text-gray-700 dark:text-gray-400">
              {{ item.book_desc }}
            </p>
            <div class="flex justify-between">
              <a
                href="javascript:void(0)"
                @click="showDetails(item)"
                class="inline-flex items-center px-3 py-2 w-32 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Read more
                <svg
                  class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
              <span
                class="inline-flex items-center px-3 py-2 font-semibold text-sm text-right"
                ><a
                  @click="showLikeDetails(item)"
                  href="javascript:void(0)"
                  class="cursor-pointer hover:underline hover:text-sidebarGreen"
                  >{{ showLikes(item.id)[0] ? showLikes(item.id)[0] : "0" }}</a
                >&nbsp; Likes</span
              >
            </div>
          </div>
        </a>
      </div>
      <div
        class="border bg-white rounded-lg px-5 py-14 w-full flex items-center justify-center"
      >
        <h1 class="text-lg text-gray-500">No recent shared book.</h1>
      </div>
    </div>
    <DataPreviewModal
      v-if="showPreview"
      :data="previewData"
      :likesCount="likesCount"
      v-on:refreshData="refreshData"
      v-on:closeModal="closeModal"
    />
    <LikesPreviewModal
      v-if="showLikePreview"
      :data="previewData"
      :likesCount="likesCount"
      v-on:refreshData="refreshData"
      v-on:closeLikePreview="closeLikePreview"
    />
  </div>
</template>
                        
<script>
import { defineComponent } from "@vue/runtime-core";

import axios from "axios";
import DataPreviewModal from "../modals/DataPreviewModal.vue";
import LikesPreviewModal from "@/modals/LikesPreviewModal.vue";
export default defineComponent({
  name: "UserDashboard",
  components: { DataPreviewModal, LikesPreviewModal },
  data: () => ({
    contents: [],
    results: 0,
    isLoading: false,
    showPreview: false,
    showLikePreview: false,
    previewData: [],
    likesData: [],
    likesCount: [],
  }),
  methods: {
    redirect(url) {
      this.$router.push(url);
    },

    convertStrToArr(str) {
      if (str) {
        return JSON.parse(str);
      } else {
        return;
      }
    },

    refreshData() {
      this.getAllBooks();
      this.getLikes();
    },

    showLikeDetails(data) {
      this.previewData = data;
      this.likesCount = this.showLikes(data.id)[0]
        ? this.showLikes(data.id)[0]
        : 0;
      this.showLikePreview = true;
    },

    closeLikePreview() {
      this.showLikePreview = false;
    },

    showDetails(data) {
      this.showPreview = true;
      this.likesCount = this.showLikes(data.id)[0]
        ? this.showLikes(data.id)[0]
        : 0;
      this.previewData = data;
    },

    closeModal() {
      this.showPreview = false;
      this.getAllBooks();
      this.getLikes();
    },

    imgUrl(filename) {
      return process.env.VUE_APP_API_SERVER + "/books/stream-file/" + filename;
    },

    getAllBooks() {
      axios
        .get(process.env.VUE_APP_API_SERVER + "/books/getAllBooks")
        .then((response) => {
          this.contents = response.data;
          this.results = response.data.length;
          this.isLoading = false;
        });
    },

    getLikes() {
      axios
        .get(process.env.VUE_APP_API_SERVER + "/likes/getLikesCount")
        .then((response) => {
          this.likesData = response.data;
        });
    },

    showLikes(bookID) {
      return this.likesData
        .filter(function (data) {
          return data.bookID == bookID;
        })
        .map(function (obj) {
          return obj.cnt;
        });
    },

    // async getLikesCount(bookID) {
    //   return axios
    //     .get(process.env.VUE_APP_API_SERVER + "/likes/getLikesCount/" + bookID)
    //     .then((response) => {
    //       return response.data;
    //     });
    // },
  },
  mounted() {
    this.getAllBooks();
    this.getLikes();
  },
});
</script>
<style scoped>
.desc {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  /* number of lines to show */
  line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
                        