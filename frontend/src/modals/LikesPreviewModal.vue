<template>
  <div
    class="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
    id="divModal"
  >
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    ></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <div class="relative p-4 w-full max-w-2xl max-h-full">
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div
              class="flex items-center justify-between p-2 md:p-5 border-b rounded-t dark:border-gray-600"
            >
              <h3
                class="text-xl ml-2 font-semibold text-gray-900 dark:text-white"
              >
                {{ data.book_name
                }}<span class="font-normal">'s likes</span> ({{ count }})
              </h3>
              <button
                @click="closeLikePreview"
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <!-- Modal body -->
            <div
              class="p-4 md:p-4 space-y-2 overflow-y-auto text-justify"
              style="max-height: 30em"
            >
              <div
                v-for="item in likeData"
                :key="item"
                class="p-4 flex justify-between text-sm text-gray-700 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-blue-400"
                role="alert"
              >
                <div>
                  <span class="font-semibold">{{
                    item.user.firstname + " " + item.user.lastname
                  }}</span>
                  liked this book.
                </div>
                <span>{{ moment(item.date_liked).fromNow() }}</span>
              </div>
              <div
                v-if="results <= 0"
                class="p-4 flex justify-between text-sm text-gray-700 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-blue-400"
                role="alert"
              >
                No likes.
              </div>
            </div>

            <!-- Modal footer -->
            <div
              class="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
            >
              <!-- CLOSE BUTTON  -->
              <button
                @click="closeLikePreview"
                data-modal-hide="default-modal"
                type="button"
                class="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-2 focus:outline-none focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
            <script>
import axios from "axios";

import { useToast } from "vue-toastification";
import moment from "moment";

export default {
  name: "LikesPreviewModal",
  props: ["data", "likesCount"],
  data() {
    return {
      count: 0,
      bookID: null,
      likeData: [],
      results: null,
    };
  },
  created() {
    this.moment = moment;
  },

  watch: {
    data: {
      handler(val) {
        if (val) {
          this.bookID = val.id;
        }
      },
      immediate: true,
    },
    likesCount: {
      handler(val) {
        if (val) {
          this.count = val;
          this.getLikes();
        }
      },
      immediate: true,
    },
  },
  methods: {
    closeLikePreview() {
      document.getElementById("divModal").classList.remove("modal_open");
      document.getElementById("divModal").classList.add("modal_close");
      setTimeout(() => this.$emit("closeLikePreview"), 400);
    },

    getLikes() {
      const toast = useToast();
      var fd = { userID: this.$store.getters.getUserId, bookID: this.bookID };
      axios
        .post(process.env.VUE_APP_API_SERVER + "/likes/getLikePerBook", fd, {})
        .then(
          (response) => {
            this.likeData = response.data;
            this.results = response.data.length;
          },
          (error) => {
            console.log(error);
          }
        );
    },
  },
  mounted() {
    document.getElementById("divModal").classList.add("modal_open");
    document.getElementById("divModal").classList.remove("modal_close");
  },
};
</script>
            <style scoped>
</style>