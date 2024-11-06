<template>
  <li class="list-group-item">
    <form @submit.prevent="addNewProduct">
      <div>
        <p class="my-3 fs-5 fw-semibold">General Information</p>
        <div>
          <div class="mb-3">
            <base-input
              type="file"
              identity="productImage"
              label="Product Image"
              @input="checkImage"
            ></base-input>
            <div>
              <img
                :src="productData.image"
                :alt="productData.name"
                class="image"
              />
            </div>
          </div>
          <div class="mb-3">
            <base-input
              type="text"
              identity="productName"
              placeholder="Enter product name"
              label="Product Name"
              v-model="productData.name"
            ></base-input>
          </div>
          <div class="mb-3">
            <base-input
              type="text"
              identity="productBrand"
              placeholder="Enter product brand"
              label="Product Brand"
              v-model="productData.brand"
            ></base-input>
          </div>
          <div class="input-group mb-3">
            <label class="input-group-text" for="productSize">Category</label>
            <base-select
              :data="['Jacket', 'T-Shirt', 'Crewneck', 'Shirt']"
              v-model="productData.category"
            ></base-select>
          </div>
          <div class="mb-3">
            <base-input
              type="number"
              identity="productPrice"
              placeholder="Enter product price"
              label="Product Price"
              v-model="productData.price"
            ></base-input>
          </div>
          <div class="mb-3">
            <base-text-area
              identity="productDescription"
              label="Description"
              placeholder="Enter product description"
              v-model="productData.description"
            ></base-text-area>
          </div>
        </div>
      </div>

      <div class="border-top py-1">
        <p class="my-3 fs-5 fw-semibold">Product Options</p>
        <div>
          <div class="input-group mb-3">
            <label class="input-group-text" for="productSize">Size</label>
            <base-select
              :data="['S', 'M', 'L', 'XL']"
              v-model="productData.size"
            ></base-select>
          </div>
          <div class="input-group mb-3">
            <label class="input-group-text" for="productSize">Quality</label>
            <base-select
              :data="['Good', 'Bad']"
              v-model="productData.quality"
            ></base-select>
          </div>
        </div>
      </div>

      <div class="border-top py-3 d-flex my-4 justify-content-end">
        <base-button class="cancel-btn px-3 py-2 ms-1">Cancel</base-button>
        <base-button
          class="submit-product-btn px-3 py-2 ms-1"
          @click="addNewProduct"
          >Submit Product</base-button
        >
      </div>
    </form>
  </li>
</template>

<script setup>
import BaseButton from "../ui/BaseButton.vue";
import BaseInput from "../ui/BaseInput.vue";
import BaseTextArea from "../ui/BaseTextArea.vue";
import BaseSelect from "../ui/BaseSelect.vue";
import { ref, reactive, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

const store = useStore();
const router = useRouter();
const route = useRoute();

const productData = ref({
  image: "",
  name: "",
  brand: "",
  category: "Jacket",
  price: 0,
  size: "S",
  quality: "Good",
  description: "",
});

const checkImage = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    productData.value.image = reader.result;
  };
  reader.readAsDataURL(file);
};

const addNewProduct = async () => {
  if (props.isEdit) {
    await store.dispatch("products/updateProduct", {
      id: route.params.id,
      updatedProduct: productData.value,
    });
  } else {
    await store.dispatch("products/addNewProduct", productData.value);
  }
  await store.dispatch("products/getProductData"); // Ambil ulang data produk
  router.push("/user/user-product");
};

const props = defineProps({ isEdit: { type: Boolean, default: false } });

onMounted(() => {
  if (props.isEdit) {
    productData.value = store.state.products.productDetail;
  }
});
// onMounted(() => {
//   if (props.isEdit) {
//     Object.assign(productData, store.state.product.productDetail);
//   }
// });
const isEdit = ref(false);

const loadData = async () => {
  if (isEdit.value) {
    await store.dispatch("products/getProductDetail", route.params.id);
    productData.value = { ...store.state.products.productDetail };
  }
};

onMounted(() => {
  isEdit.value = route.name === "EditProductPage";
  loadData();
});
watch(
  () => store.state.products.productDetail,
  (newData) => {
    if (isEdit.value) {
      productData.value = { ...newData };
    }
  }
);
</script>

<style>
.image {
  width: 100px;
  height: auto;
}
</style>
