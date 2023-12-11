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
              class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
            >
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                {{ modalHeader }}
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
            <div
              class="p-4 md:p-5 space-y-4 overflow-y-auto"
              style="max-height: 30em"
            >
              <form method="post" enctype="multipart/form-data" @submit.prevent>
                <div class="grid text-left gap-2">
                  <label for="bookName" class="pl-2"
                    >Book name <span class="text-red-500">*</span></label
                  >
                  <input
                    name="bookName"
                    type="text"
                    v-model="book_name"
                    autocomplete="off"
                    class="border p-2.5 border-gray-500 rounded-lg w-full"
                    placeholder="Book Name"
                  />
                </div>

                <div class="grid text-left gap-2 my-2 mt-5">
                  <label for="bookDesc" class="pl-2"
                    >Description <span class="text-red-500">*</span></label
                  >
                  <textarea
                    name="bookDesc"
                    type="text"
                    v-model="book_desc"
                    autocomplete="off"
                    rows="5"
                    class="border p-2.5 border-gray-500 rounded-lg w-full"
                    placeholder="Description"
                  ></textarea>
                </div>
                <div class="grid text-left gap-2 my-2 mt-5">
                  <label for="bookName" class="pl-2"
                    >Cover Image <span class="text-red-500">*</span></label
                  >
                  <label
                    v-show="imgUrls.length <= 0"
                    for="dropzone-file"
                    @drop="dropt"
                    @dragenter.prevent
                    @dragover.prevent
                    @drag.prevent
                    @change="onFileChange"
                    class="flex flex-col justify-center items-center w-full h-40 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div
                      class="flex flex-col justify-center items-center pt-5 pb-6"
                    >
                      <svg
                        aria-hidden="true"
                        class="mb-3 w-10 h-10 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span class="font-semibold">Click to upload</span> or
                        drag and drop
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <!-- <input id="dropzone-file" type="file" multiple class="hidden" /> -->
                    <input id="dropzone-file" type="file" class="hidden" />
                  </label>
                </div>
                <div
                  v-show="imgUrls.length > 0"
                  id="gallery"
                  class="flex flex-wrap justify-center border border-gray-300 rounded-md w-full m-auto"
                >
                  <input type="button" value="" />
                  <div v-for="item in imgUrls" :key="item" class="">
                    <span
                      class="inline-flex relative items-center p-3 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <div>
                        <img class="w-40 h-40 border" :src="item.url" />
                        <div
                          @click="imgToDelete(item.name)"
                          class="cursor-pointer inline-flex absolute top-1 right-1 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-900"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      </div>
                    </span>
                  </div>
                </div>
                <div class="grid text-left gap-2 my-2 mt-5" v-if="isUpdate">
                  <label for="bookName" class="pl-2">Add Allowed Users</label>
                  <div class="mx-2">
                    <ul
                      id="customScroll"
                      class="checkbox-select__filters-wrapp"
                      data-simplebar-auto-hide="false"
                    >
                      <li v-for="item in allUsers" :key="item">
                        <div class="checkbox-select__check-wrapp">
                          <input
                            :id="item.lastname"
                            class="conditions-check"
                            v-model="checkedUsers"
                            :value="item.id"
                            type="checkbox"
                          />
                          &nbsp;
                          <label :for="item.lastname"
                            >{{ item.firstname + " " + item.lastname }}
                            <span class="text-xs text-gray-400"
                              >User
                            </span></label
                          >
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </form>
            </div>

            <!-- Modal footer -->
            <div
              class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
            >
              <!-- ADD BUTTON  -->
              <button
                v-if="!isUpdate"
                @click="submit"
                data-modal-hide="default-modal"
                type="button"
                class="text-white bg-sidebarGreen hover:bg-sidebarGreen focus:ring-2 focus:outline-none focus:ring-sidebarGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Upload
              </button>

              <!-- UPDATE BUTTON  -->
              <button
                v-if="isUpdate"
                @click="update"
                data-modal-hide="default-modal"
                type="button"
                class="text-white bg-sidebarGreen hover:bg-sidebarGreen focus:ring-2 focus:outline-none focus:ring-sidebarGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Update
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
</template>
<script>
import axios from "axios";
import { useToast } from "vue-toastification";

export default {
  name: "UploadBookModal",
  props: ["data", "modalHeader"],
  data() {
    return {
      err_book_name: false,
      err_book_desc: false,
      err_book_img: false,
      book_name: null,
      book_desc: null,
      cover_image: null,
      allowed_users: [],
      imgUrls: [],
      fileData: [],
      itemToDelete: [],
      checkedUsers: [],
      prevCover: [],
      isUploadImage: false,
      isImgUrlHasOne: false,
      fileData_err: false,
      book_id: null,
      book_user_id: null,
      isUpdate: false,
      allUsers: [],
    };
  },
  methods: {
    showAllUsers() {
      var fd = {
        id: this.$store.getters.getUserId,
      };
      axios
        .post(process.env.VUE_APP_API_SERVER + "/users/getAllUsers", fd, {})
        .then(
          (response) => {
            this.allUsers = response.data;
          },
          (error) => {
            console.log(error);
          }
        );
    },

    closeModal() {
      document.getElementById("divModal").classList.remove("modal_open");
      document.getElementById("divModal").classList.add("modal_close");
      setTimeout(() => this.$emit("closeModal"), 400);
    },

    update() {
      const toast = useToast();
      if (this.book_name == null) {
        this.err_book_name = true;
        toast.error("Book Name is required.", {
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
      } else {
        this.err_book_name = false;
      }

      if (this.book_desc == null) {
        this.err_book_desc = true;
        toast.error("Book Description is required.", {
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
      } else {
        this.err_book_desc = false;
      }

      if (this.imgUrls.length <= 0) {
        this.err_book_img = true;
        toast.error("Book Cover Image is required.", {
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
      } else {
        this.err_book_img = false;
      }

      if (!this.err_book_name && !this.err_book_desc && !this.err_book_img) {
        if (this.imgUrls[0].url == this.prevCover[0].url) {
          const fd = {
            book_name: this.book_name,
            book_desc: this.book_desc,
            userID: this.$store.getters.getUserId,
            allowed_users: JSON.stringify(this.checkedUsers),
            book_id: this.book_id,
          };
          axios
            .post(
              process.env.VUE_APP_API_SERVER + "/books/updateMyBook",
              fd,
              {}
            )
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

                  this.$emit("refreshData");
                  this.$emit("closeModal");
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
                }
              },
              (error) => {
                console.log(error);
              }
            );
        } else {
          const fd = new FormData();
          this.fileData.forEach((element) => {
            fd.append("files", element);
          });

          fd.append("book_name", this.book_name);
          fd.append("book_desc", this.book_desc);
          fd.append("userID", this.$store.getters.getUserId);
          fd.append("book_id", this.book_id);
          fd.append("itemToDeleteCoverName", this.prevCover[0].name);
          fd.append("itemToDeleteCoverUrl", this.prevCover[0].url);
          axios
            .post(
              process.env.VUE_APP_API_SERVER + "/books/updateBookWithCoverImg",
              fd,
              {}
            )
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

                  this.$emit("refreshData");
                  this.$emit("closeModal");
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
                }
              },
              (error) => {
                console.log(error);
              }
            );
        }
      }
    },

    submit() {
      const toast = useToast();
      if (this.book_name == null) {
        this.err_book_name = true;
        toast.error("Book Name is required.", {
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
      } else {
        this.err_book_name = false;
      }

      if (this.book_desc == null) {
        this.err_book_desc = true;
        toast.error("Book Description is required.", {
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
      } else {
        this.err_book_desc = false;
      }

      if (this.imgUrls.length <= 0) {
        this.err_book_img = true;
        toast.error("Book Cover Image is required.", {
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
      } else {
        this.err_book_img = false;
      }

      if (!this.err_book_name && !this.err_book_desc && !this.err_book_img) {
        const fd = new FormData();
        this.fileData.forEach((element) => {
          fd.append("files", element);
        });

        fd.append("book_name", this.book_name);
        fd.append("book_desc", this.book_desc);
        fd.append("userID", this.$store.getters.getUserId);
        axios
          .post(process.env.VUE_APP_API_SERVER + "/books/uploadBook", fd, {})
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
                this.$emit("closeModal");
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
              }
            },
            (error) => {
              console.log(error);
            }
          );
      }
    },
    dropt(ev) {
      ev.preventDefault();

      const dropfls = ev.dataTransfer.files;

      for (let i = 0; i < dropfls.length; i++) {
        var urls = URL.createObjectURL(dropfls[i]);
        var img = {
          url: urls,
          name: dropfls[i].name,
        };
        this.imgUrls.push(img);

        this.fileData.push(dropfls[i]);
      }
    },
    onFileChange(event) {
      const ed = event.target.files;

      for (let i = 0; i < ed.length; i++) {
        var urls = URL.createObjectURL(ed[i]);
        var img = {
          url: urls,
          name: ed[i].name,
        };
        this.imgUrls.push(img);
        this.fileData.push(ed[i]);
      }
    },
    showImage(filename) {
      return (
        process.env.VUE_APP_API_SERVER + "/announcement/stream-file/" + filename
      );
    },
    imgToDelete(filename) {
      if (this.isUpdate) {
        this.itemToDelete.push(filename);
        this.imgUrls = this.imgUrls.filter(
          (imgurl) => imgurl.name !== filename
        );
        this.fileData = this.fileData.filter((file) => file.name !== filename);
      } else {
        this.imgUrls = this.imgUrls.filter(
          (imgurl) => imgurl.name !== filename
        );
        this.fileData = this.fileData.filter((file) => file.name !== filename);
      }
      document.querySelector("#dropzone-file").value = "";
    },
  },
  mounted() {
    document.getElementById("divModal").classList.add("modal_open");
    document.getElementById("divModal").classList.remove("modal_close");
  },

  watch: {
    modalHeader: {
      handler(val) {
        if (val == "Upload Your Book") {
          this.isUpdate = false;
        } else {
          this.isUpdate = true;
        }
      },
      immediate: true,
    },
    data: {
      handler(val) {
        if (!this.isUpdate) {
          this.book_name = null;
          this.book_desc = null;
          this.cover_image = null;
        } else if (this.isUpdate) {
          this.showAllUsers();
          if (val.cover_image && val.cover_image != "") {
            axios
              .get(
                process.env.VUE_APP_API_SERVER +
                  "/books/stream-file/" +
                  val.cover_image,
                {
                  responseType: "blob",
                }
              )
              .then((response) => {
                const blob = new Blob([response.data], {
                  type: "jpg",
                });
                const objectURL = URL.createObjectURL(blob);
                this.imgUrls.push({ name: val.cover_image, url: objectURL });
                this.prevCover.push({ name: val.cover_image, url: objectURL });
              });
          }
          this.checkedUsers = JSON.parse(val.allowed_users);
          this.book_id = val.id;
          this.book_name = val.book_name;
          this.book_desc = val.book_desc;
          this.book_user_id = val.userID;
        }
      },
      immediate: true,
    },
  },
};
</script>
            
<style scoped>
</style>