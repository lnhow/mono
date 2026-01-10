<template>
  <div ref="root"></div>
</template>

<script setup lang="ts">
/**
 * This component is a bridge to mount the React Card component inside Vue.
 * It uses the `mount` function from the `mfe1/bridges/card-raw` module to mount the React component.
 *
 * DO NOT USE THIS FILE IN PRODUCTION. IT IS FOR DEMONSTRATION PURPOSES ONLY.
 * Use `createBridgeComponent` from `@module-federation/bridge-vue3` instead.
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  style: {
    type: Object as () => Record<string, string>,
    required: false,
  },
  children: {
    type: String,
    required: false,
  },
})
const root = ref<HTMLElement | null>(null)
let unmountFn: (() => void) | null = null

onMounted(() => {
  import('mfe1/bridges/card-dummy').then(({ mount }) => {
    if (!root.value) {
      return
    }

    unmountFn = mount(root.value, props)
  })
})

onBeforeUnmount(() => {
  if (unmountFn) unmountFn()
})
</script>
