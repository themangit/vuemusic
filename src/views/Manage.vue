<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <app-upload ref="upload" :addsong="addsong" />
      </div>
      <div class="col-span-2">
        <div
          class="bg-white rounded border border-gray-200 relative flex flex-col"
        >
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i
              class="fa fa-compact-disc float-right text-green-400 text-2xl"
            ></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <compositionItem
              v-for="(song, i) in songs"
              :key="song.docID"
              :song="song"
              :updateSong="updateSong"
              :index="i"
              :removeSong="removeSong"
              :updateUnsavedFlag="updateUnsavedFlag"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AppUpload from "@/components/Upload.vue";
import compositionItem from "@/components/compositionItem.vue";
import { songCollection, auth } from "@/includes/firebase";

// import useUserStore from "@/stores/user";
export default {
  name: "Manage",
  components: {
    AppUpload,
    compositionItem,
  },
  data() {
    return {
      songs: [],
      unsavedflag: false,
    };
  },
  async created() {
    const snapshot = await songCollection
      .where("uid", "==", auth.currentUser.uid)
      .get();
    snapshot.forEach(this.addsong);
  },
  methods: {
    updateSong(i, values) {
      this.songs[i].modified_name = values.modified_name;
      this.songs[i].gener = values.gener;
    },
    removeSong(i) {
      this.songs.splice(i, 1);
    },
    addsong(document) {
      const song = {
        ...document.data(),
        docID: document.id,
      };
      this.songs.push(song);
    },
    updateUnsavedFlag(value) {
      this.unsavedflag = value;
    },
  },
  beforeRouteLeave(to, from, next) {
    if (!this.unsavedflag) {
      next();
    } else {
      const leave = confirm(
        "You have unsaved changes, Are you sure you want to leave ?"
      );
      next(leave);
    }
  },
  //   beforeRouteLeave(to, from, next) {
  //     this.$refs.upload.cancelUploads();
  //     next();
  //   },
  // beforeRouteEnter(to, from, next) {
  //   const store = useUserStore();

  //   if (store.userLoggedIn) {
  //     next();
  //   } else {
  //     next({ name: "home" });
  //   }
  // },
};
</script>
