<template>
  <div class="content">
    <h1>MFE Vue</h1>
    <CardDummy
      :title="`Card Title from MFE Vue 3. Count is ${count}`"
      description="Vue 3 is using a React Card. It uses `createRoot` from `react-dom/client` to mount the React component inside a Vue component."
      :style="{ margin: '1rem' }"
    />
    <Card
      :title="`Card Title from MFE Vue 3 using Bridge. Count is ${count}`"
      description="This Card component is loaded using `createRemoteAppComponent` from `@module-federation/bridge-vue3`."
      :children="'This is a child text passed to the Card component.'"
    />
    <div>
      <p>Button click count: {{ count }}</p>
      <button
        @click="count++"
        style="padding: 0.5rem 1rem; font-size: 1rem; cursor: pointer"
      >
        Click me to increase count
      </button>
      <ReactButton
        @click="count++"
        children="This button from MFE React 1 using Bridge can increase the count too"
        :style="{ marginTop: '0.5rem' }"
      />
      <p>Limitations</p>
      <ul style="text-align: left; max-width: 600px; margin: 0 auto 2rem auto">
        <li>
          Props passed to the React component must be serializable. Complex
          objects like functions, class instances, or DOM elements cannot be
          passed as props.
        </li>
        <li>
          State management between Vue and React components is limited. Changes
          in state within the React component will not automatically reflect in
          the Vue component and vice versa.
        </li>
        <li>
          Event handling can be cumbersome. Events emitted from the React
          component need to be manually handled in the Vue component.
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { createRemoteAppComponent } from '@module-federation/bridge-vue3'
import CardDummy from './card-bridge.vue'

export default {
  name: 'App',
  components: {
    CardDummy,
    Card: createRemoteAppComponent({
      loader: () => import('mfe1/bridges/card'),
      // Attributes can be passed here to root of the React tree
      rootAttrs: {
        style: { margin: '1rem' },
      },
    }),
    ReactButton: createRemoteAppComponent({
      loader: () => import('mfe1/bridges/button'),
    }),
  },
  data() {
    return {
      count: 0,
    }
  },
}
</script>

<style scoped>
.content {
  display: flex;
  min-height: 100vh;
  line-height: 1.1;
  text-align: center;
  flex-direction: column;
  justify-content: center;
}

.content h1 {
  font-size: 3.6rem;
  font-weight: 700;
}

.content p {
  font-size: 1.2rem;
  font-weight: 400;
  opacity: 0.5;
}
</style>
