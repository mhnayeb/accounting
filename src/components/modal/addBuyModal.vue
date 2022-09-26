<template>
  <div
    class="modal fade"
    id="addBuy"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalToggleLabel">خرید جدید</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="input">
            <div class="lastname d__flex column__row">
              <input
                id="lastname"
                inputmode="numeric"
                v-model="paidobject.price"
                type="text"
                placeholder="قیمت"
              />
            </div>
            <div class="time-date">
              <div class="date">
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
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </svg>
                <DatePicker v-model="paidobject.date"/>
              </div>
              <div class="time">
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
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <DatePicker type="time" v-model="paidobject.time" />
              </div>
            </div>
            <div class="number__person d__flex column__row">
              <textarea
                id="numOfPerson"
                type="text"
                v-model="paidobject.description"
                placeholder="توضیحات خرید"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button data-bs-toggle="modal" data-bs-dismiss="modal" @click="updatePerson()">
            <a data-bs-toggle="modal"> ثبت خرید </a>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DatePicker from "vue3-persian-datetime-picker";
import { db } from "../../plugin/db";
import {PaidList , Person} from "../../interface/interface"
const date = ref<string>();
const time = ref<string>();
const props = defineProps<{ name: string | undefined }>();
const paidobject = ref<PaidList>({})
const paidList = ref<PaidList[]>([])
const personList = ref<Person[]>([])
async function updatePerson() {
  // if(props.name && paidList.value)
  // await db.listPerson.update(props.name, {name: 'mohammad hossein'} );
  personList.value = await db.listPerson.where("name").equals(props.name ?? '').toArray();
  personList.value[0].paidList?.push(paidobject.value)
  await db.listPerson.add(personList.value[0]);
}

</script>

<style lang="scss">
.input {
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .time-date {
    width: 100%;
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(2, 1fr);
    .time,
    .date {
      display: flex;
      position: relative;
      svg {
        width: 20px;
        color: var(--yellow);
        position: absolute;
        right: 10px;
        top: 20px;
      }
      .vpd-main {
        margin-top: 10px;
        .vpd-input-group {
          .vpd-icon-btn {
            display: none;
          }
          input {
            padding: 6px 35px 6px 6px;
            width: 100%;
            border: none;
            background-color: transparent;
            border: 1px solid var(--yellow);
            color: white;
            border-radius: 10px;
            font-size: 14px;
            outline: none;
          }
        }
      }
    }
  }
  .number__person,
  .lastname {
    width: 100%;
    textarea {
      width: 100%;
      border: none;
      background-color: transparent;
      border: 1px solid var(--yellow);
      color: white;
      border-radius: 10px;
      padding: 10px;
      font-size: 14px;
      outline: none;
      &::placeholder {
        color: var(--yellow);
      }
    }
    input {
      width: 100%;
      border: none;
      background-color: transparent;
      border: 1px solid var(--yellow);
      color: white;
      border-radius: 10px;
      padding: 10px;
      font-size: 14px;
      outline: none;
      &::placeholder {
        color: var(--yellow);
      }
    }
  }
  .number__person {
    margin-top: 10px;
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
  .modal-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
</style>
