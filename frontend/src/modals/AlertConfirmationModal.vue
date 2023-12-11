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
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Delete
              </h3>
              <button
                @click="closeConfirmOpen"
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
            <div class="p-4 md:p-5 space-y-6 overflow-y-auto">
              <h3
                class="text-xl font-normal py-5 text-gray-900 dark:text-white"
              >
                You are about to delete
                <span class="font-semibold">{{ data.book_name }}</span
                >. <br />
                Do you want to proceed?
              </h3>
            </div>

            <!-- Modal footer -->
            <div
              class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
            >
              <!-- DELETE BUTTON  -->
              <button
                @click="confirmDelete"
                data-modal-hide="default-modal"
                type="button"
                class="text-white bg-red-500 hover:bg-red-400 focus:ring-2 focus:outline-none focus:ring-red-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Proceed
              </button>

              <!-- CLOSE BUTTON  -->
              <button
                @click="closeConfirmOpen"
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

export default {
  name: "AlertConfirmationModal",
  props: ["data"],
  data() {
    return {
      deleteDataID: null,
      cover_image: null,
    };
  },

  watch: {
    data: {
      handler(val) {
        if (val) {
          this.deleteDataID = val.id;
          this.cover_image = val.cover_image;
        }
      },
      immediate: true,
    },
  },
  methods: {
    closeConfirmOpen() {
      document.getElementById("divModal").classList.remove("modal_open");
      document.getElementById("divModal").classList.add("modal_close");
      setTimeout(() => this.$emit("closeConfirmOpen"), 400);
    },

    confirmDelete() {
      const toast = useToast();
      var fd = { id: this.deleteDataID, cover_image: this.cover_image };
      axios.post(process.env.VUE_APP_API_SERVER + "/books/delete", fd, {}).then(
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
            this.$emit("closeConfirmOpen");
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
            this.$emit("closeConfirmOpen");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },

    //     update() {
    //       const toast = useToast();

    //       if (!this.err_book_name && !this.err_book_desc && !this.err_book_img) {
    //         if (this.imgUrls[0].url == this.prevCover[0].url) {
    //           const fd = {
    //             book_name: this.book_name,
    //             book_desc: this.book_desc,
    //             userID: this.$store.getters.getUserId,
    //             book_id: this.book_id,
    //           };

    //         } else {
    //           const fd = new FormData();
    //           this.fileData.forEach((element) => {
    //             fd.append("files", element);
    //           });

    //           fd.append("book_name", this.book_name);
    //           fd.append("book_desc", this.book_desc);
    //           fd.append("userID", this.$store.getters.getUserId);
    //           fd.append("book_id", this.book_id);
    //           fd.append("itemToDeleteCoverName", this.prevCover[0].name);
    //           fd.append("itemToDeleteCoverUrl", this.prevCover[0].url);
    //           axios
    //             .post(
    //               process.env.VUE_APP_API_SERVER + "/books/updateBookWithCoverImg",
    //               fd,
    //               {}
    //             )
    //             .then(
    //               (response) => {
    //                 if (response.data.status == 201) {
    //                   toast.success(response.data.msg, {
    //                     position: "top-right",
    //                     timeout: 3000,
    //                     closeOnClick: true,
    //                     pauseOnFocusLoss: false,
    //                     pauseOnHover: false,
    //                     draggable: true,
    //                     draggablePercent: 0.6,
    //                     showCloseButtonOnHover: false,
    //                     hideProgressBar: false,
    //                     closeButton: "button",
    //                     icon: true,
    //                     rtl: false,
    //                   });
    //                   this.$emit("closeModal");
    //                   this.$emit("refreshData");
    //                 } else {
    //                   toast.warning(response.data.msg, {
    //                     position: "top-right",
    //                     timeout: 3000,
    //                     closeOnClick: true,
    //                     pauseOnFocusLoss: false,
    //                     pauseOnHover: false,
    //                     draggable: true,
    //                     draggablePercent: 0.6,
    //                     showCloseButtonOnHover: false,
    //                     hideProgressBar: false,
    //                     closeButton: "button",
    //                     icon: true,
    //                     rtl: false,
    //                   });
    //                 }
    //               },
    //               (error) => {
    //                 console.log(error);
    //               }
    //             );
    //         }
    //       }
    //     },
  },
  mounted() {
    document.getElementById("divModal").classList.add("modal_open");
    document.getElementById("divModal").classList.remove("modal_close");
  },
};
</script>
<style scoped>
</style>