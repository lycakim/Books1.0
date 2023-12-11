<template>
  <div class="bg mt-18 w-full px-6">
    <div class="relative overflow-x-auto bg-white">
      <div class="p-4 flex justify-end">
        <button
          @click="openModal"
          class="bg-sidebarGreen p-2.5 rounded text-white"
        >
          &plus; &nbsp;Add new book
        </button>
      </div>

      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase rouned-t-full bg-gray-100 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr class="border border-gray-200">
            <th scope="col" class="px-6 py-3 w-1/6">Book Name</th>
            <th scope="col" class="px-6 py-3 w-2/4">Description</th>
            <th scope="col" class="px-6 py-3">Date Uploaded</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-if="results <= 0"
            class="bg-white text-center border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td
              colspan="4"
              scope="row"
              class="px-6 py-4 italic text-xs text-gray-500 whitespace-nowrap dark:text-white"
            >
              No data available.
            </td>
          </tr>

          <tr
            v-for="items in contents"
            :key="items"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ items.book_name }}
            </th>
            <td class="px-6 py-4">{{ items.book_desc }}</td>
            <td class="px-6 py-4">
              {{ moment(items.date_uploaded).fromNow() }}
            </td>
            <td class="px-6 py-4">
              <button
                @click="updateMyBooks(items)"
                class="bg-sidebarGreen p-2.5 mx-1 rounded text-white"
              >
                Update
              </button>
              <button
                @click="openConfirm(items)"
                class="bg-red-500 p-2.5 rounded text-white"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <UploadBookModal
      v-if="isAddModalOpen"
      v-on:closeModal="closeModal"
      v-on:refreshData="refreshData"
      :modalHeader="modalHeader"
      :data="toUpdateContent"
    />
    <AlertConfirmationModal
      v-if="isConfirmOpen"
      v-on:closeConfirmOpen="closeConfirmOpen"
      v-on:refreshData="refreshData"
      :data="toDeleteContent"
    />
  </div>
</template>
                                    
<script>
import { defineComponent } from "@vue/runtime-core";
import moment from "moment";
import UploadBookModal from "../modals/UploadBookModal.vue";
import AlertConfirmationModal from "@/modals/AlertConfirmationModal.vue";
import axios from "axios";
export default defineComponent({
  name: "BooksTable",
  mounted() {
    this.getBooks();
  },
  components: { UploadBookModal, AlertConfirmationModal },
  data: () => ({
    isConfirmOpen: false,
    isAddModalOpen: false,
    isLoading: false,
    contents: [],
    results: 0,
    modalHeader: null,
    toUpdateContent: [],
    toDeleteContent: null,
  }),
  created() {
    this.moment = moment;
  },
  mounted() {
    this.refreshData();
  },
  methods: {
    openModal() {
      this.isAddModalOpen = true;
      this.toUpdateContent = [];
      this.modalHeader = "Upload Your Book";
    },

    openConfirm(data) {
      // console.log(data);
      this.toDeleteContent = data;
      this.isConfirmOpen = true;
    },

    refreshData() {
      this.getBooks();
    },

    closeModal() {
      this.isAddModalOpen = false;
      this.refreshData();
    },

    closeConfirmOpen() {
      this.isConfirmOpen = false;
      this.refreshData();
    },

    updateMyBooks(data) {
      this.isAddModalOpen = true;
      this.toUpdateContent = data;
      this.modalHeader = "Update Your Book";
    },

    getBooks() {
      this.isLoading = true;
      if (this.$store.getters.getUserId) {
        const fd = {
          userID: this.$store.getters.getUserId,
        };
        axios
          .post(process.env.VUE_APP_API_SERVER + "/books/getMyBooks", fd, {})
          .then((response) => {
            this.contents = response.data;

            this.results = response.data.length;
            this.isLoading = false;
          });
      }
    },
  },
});
</script>
<style scoped>
</style>
                                    