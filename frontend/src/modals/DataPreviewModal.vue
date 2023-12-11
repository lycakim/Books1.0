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
                Preview
              </h3>
              <button
                @click="closeModal"
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
            <div class="p-4 md:p-5 space-y-6 overflow-y-auto text-justify">
              <div class="p-2">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  {{ data.book_name }}
                </h3>
                {{ data.book_desc }}
              </div>
            </div>

            <!-- Modal footer -->
            <div
              class="flex items-center justify-between p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
            >
              <div class="ml-2">
                <a class="font-semibold">{{ count }}</a> Likes
              </div>

              <div>
                <!-- LIKE BUTTON  -->
                <button
                  @click="confirmLike"
                  data-modal-hide="default-modal"
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-600 focus:ring-2 focus:outline-none focus:ring-blue-700 font-medium rounded-lg text-sm px-6 py-2.5 text-center"
                >
                  Like
                </button>

                <!-- CLOSE BUTTON  -->
                <button
                  @click="closeModal"
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
  </div>
</template>
            <script>
import axios from "axios";
import { useToast } from "vue-toastification";

export default {
  name: "DataPreviewModal",
  props: ["data", "likesCount"],
  data() {
    return {
      bookID: null,
      cover_image: null,
      count: 0,
    };
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
        }
      },
      immediate: true,
    },
  },
  methods: {
    closeModal() {
      document.getElementById("divModal").classList.remove("modal_open");
      document.getElementById("divModal").classList.add("modal_close");
      setTimeout(() => this.$emit("closeModal"), 400);
    },

    confirmLike() {
      const toast = useToast();
      var fd = { userID: this.$store.getters.getUserId, bookID: this.bookID };
      axios
        .post(process.env.VUE_APP_API_SERVER + "/likes/addLike", fd, {})
        .then(
          (response) => {
            if (response.data.status == 201) {
              toast.success(response.data.msg, {
                position: "top-right",
                timeout: 3000,
                closeOnClick: true,
                pauseOnFocusLoss: false,
                pauseOnHover: false,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: false,
                closeButton: "button",
                icon: true,
                rtl: false,
              });
              this.count = parseInt(this.count) + 1;
              // this.$emit("closeModal");
              this.$emit("refreshData");
            } else {
              toast.warning(response.data.msg, {
                position: "top-right",
                timeout: 3000,
                closeOnClick: true,
                pauseOnFocusLoss: false,
                pauseOnHover: false,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: false,
                closeButton: "button",
                icon: true,
                rtl: false,
              });
              // this.$emit("closeModal");
            }
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