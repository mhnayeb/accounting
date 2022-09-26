<template>
  <div
    class="modal fade"
    id="exampleModalToggle"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalToggleLabel">
            اضافه کردن افراد جدید
          </h5>
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
                v-model="name"
                type="text"
                placeholder="نام خانوادگی"
              />
            </div>
            <div class="number__person d__flex column__row">
              <input
                id="numOfPerson"
                type="number"
                v-model="count"
                placeholder="تعداد افراد خانواده"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            data-bs-toggle="modal"
            data-bs-dismiss="modal"
            @click="addPerson"
          >
            اضافه کردن
          </button>
        </div>
      </div>
    </div>
  </div>
  <a
    class="btn no__list"
    data-bs-toggle="modal"
    href="#exampleModalToggle"
    role="button"
    ><svg
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
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  </a>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { db } from "../plugin/db";

const count = ref<number>();
const name = ref<string>("");
const emits = defineEmits(["create"]);

function addPerson() {
  db.listPerson.add({
    name: name.value,
    count: count.value ?? 0,
    paid: "0",
    debt: "0",
    paidList: [],
  });
  emits("create");
}
</script>
<style scoped lang="scss">
.input {
  display: flex;
  flex-direction: column;
  align-items: center;
  .number__person,
  .lastname {
    margin-left: 20px;
    input {
      width: 300px;
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
    margin-top: 20px;
  }
}
.no__list {
  padding: 0px;
  width: 40px;
  height: 40px;
  background-color: var(--bacground-2);
  border-radius: 1550px;
  box-shadow: var(--yellow) -2px 2px 3px;

  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    box-shadow: none;
  }
  svg {
    width: 25px;
    height: 25px;
    color: var(--yellow);
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
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
