<template>
  <div v-if="person.length !== 0" class="one__persone title">
    <ul>
      <li>نام</li>
      <li>تعداد</li>
      <li>پرداختی</li>
      <li>بدهی</li>
      <li>لیست خرید ها</li>
      <li>حذف</li>
    </ul>
  </div>
  <div class="one__persone" v-for="item in person" :key="item.name">
    <ul>
      <li>{{ item?.name }}</li>
      <li>{{ item?.count }}</li>
      <li class="paid">
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
            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {{ item?.paid }}
      </li>
      <li class="debt">
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
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
          />
        </svg>
        {{ item.debt }}
      </li>
      <li>
        <button>
          <a
            class="btn no__list"
            data-bs-toggle="modal"
            href="#List"
            role="button"
            @click="oneNamePerson = item.name"
          >
            خرید ها
          </a>
        </button>
      </li>
      <li @click="removePerson(item.name)">
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
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </li>
    </ul>
  </div>
  <listModal :name='oneNamePerson'/>
  <AddBuyModal :name="oneNamePerson" />
</template>

<script setup lang="ts">
import { ref, onMounted, toRef, watch } from "vue";
import { Person } from "../interface/interface";
import listModal from "./modal/listModal.vue";
import AddBuyModal from "./modal/addBuyModal.vue";
import { db } from "../plugin/db";

const person = ref<Person[]>([]);

const props = defineProps<{ created: number }>();
const created = toRef(props, "created");
const oneNamePerson = ref<string | undefined>('')

watch(created, () => {
  getPersonList();
});

onMounted(() => {
  getPersonList();
});

async function getPersonList() {
  person.value = [...(await db.listPerson.toArray())];
}

async function removePerson(name: string | undefined) {
  if (confirm(" ایا مایل به حذف " + name + " هستید ")) {
    if (name) await db.listPerson.where("name").equals(name).delete();
    getPersonList();
  }
}
</script>

<style scoped lang="scss">
.one__persone {
  padding: 10px;
  border-radius: 10px;
  background-color: var(--bacground-2);
  margin-bottom: 10px;
  ul {
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 2fr 2fr 2fr 2fr 2fr 1fr;
    justify-items: center;
    li {
      display: flex;
      align-items: center;
      list-style: none;
      color: white;
      button {
        background-color: transparent;
        border: none;
        a {
          background-color: var(--bacground-2);
          border-radius: 10px;
          border: 1px solid var(--yellow);
          padding: 5px 15px;
          outline: none !important;
          color: var(--yellow);
          font-size: clamp(10px, 2.5vw, 12px);
          font-weight: bold;
          &:hover {
            background-color: var(--bacground);
          }
        }
      }
      svg {
        width: 20px;
        color: var(--red);
        &:hover {
          cursor: pointer;
        }
      }
    }
    .paid {
      svg {
        width: 20px;
        margin-left: 8px;
        color: rgb(0, 192, 0);
      }
    }
    .debt {
      svg {
        color: rgb(248, 38, 38);
        width: 20px;
        margin-left: 8px;
      }
    }
  }
}
.title {
  ul {
    li {
      color: var(--yellow);
      font-weight: bold;
    }
  }
}
</style>
