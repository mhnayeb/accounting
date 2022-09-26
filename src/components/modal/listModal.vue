<template>
  <div
    class="modal fade"
    id="List"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalToggleLabel">
            لیست خرید های {{ name }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="list" v-for="onePerson in person">
            <div
              v-if="onePerson.paidList?.length !== 0"
              class="one__buy"
              v-for="paidList in onePerson.paidList"
              :key="paidList.price"
            >
              <div class="">
                <p>{{ paidList.description }}</p>
                <bdi>{{ paidList.date }}</bdi>
                <bdi>{{ paidList.time }}</bdi>
              </div>
              <span>
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
                {{ paidList.price }} ریال
              </span>
              <button>
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
              </button>
            </div>
            <div v-else class="no__data">
              <span>هیچ خریدی موجود نیست</span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button data-bs-toggle="modal" data-bs-dismiss="modal">
            <a
              href="#addBuy"
              class="btn no__list"
              data-bs-toggle="modal"
              role="button"
            >
              اضافه کردن
            </a>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, toRef, watch } from "vue";
import { Person } from "../../interface/interface";
import { db } from "../../plugin/db";
const props = defineProps<{ name: string }>();
const name = toRef(props, "name");
const person = ref<Person[]>([]);

watch(name, () => {
  getListPaidPerson();
});

async function getListPaidPerson() {
  person.value = await db.listPerson.where("name").equals(props.name).toArray();
}
</script>

<style scoped lang="scss">
.list {
  padding: 0 10px;
  overflow-y: scroll;
  height: 180px;
  display: flex;
  align-items: center;
  .no__data {
    span {
      color: var(--red);
    }
  }
}
.one__buy {
  display: grid;
  grid-template-columns: 4fr 3fr 1fr;
  align-items: center;
  background-color: var(--bacground-2);
  padding: 10px;
  border: 1px solid var(--yellow);
  border-radius: 10px;
  gap: 2px;
  margin-top: 10px;
  bdi {
    margin-left: 10px;
    font-size: 10px;
    color: var(--yellow);
  }
  p {
    color: white;
    margin: 0;
  }
  span {
    color: var(--yellow);
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      width: 20px;
      margin-left: 5px;
    }
  }
  button {
    display: flex;
    justify-content: flex-end;
    background-color: transparent;
    border: none;
    // width: fit-content;
    svg {
      width: 20px;
      color: var(--red);
    }
  }
}
.modal-content {
  background-color: var(--bacground);
  .modal-title {
    color: var(--yellow);
  }
  .modal-header {
    border-bottom: none;
    button {
      margin: 0;
    }
  }
  .modal-footer {
    border-top: none;
    button {
      border: none;
      background-color: transparent;
      a {
        border-radius: 10px;
        padding: 8px 20px;
        font-size: clamp(11px, 2.5vw, 13px);
        background-color: var(--bacground);
        border: 1px solid var(--yellow);
        color: var(--yellow);
        &:hover {
          background-color: var(--yellow);
          border: 1px solid var(--bacground);
          color: var(--bacground);
        }
      }
    }
  }
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--yellow);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
