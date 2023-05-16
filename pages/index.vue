<script>
import { useMagicKeys, useThrottleFn } from '@vueuse/core';
import { Howl } from 'howler';
export default {
  setup() {
    const showModal = ref(false);
    const sound = new Howl({
	  src: ['/audio/sound.mp3']
	});
	const { b, a } = useMagicKeys();

	const throttledAction = useThrottleFn(() => {
      sound.play();
      showModal.value = true;
    }, 5000);

	watch([a, b], ([isA, isB]) => {
	  if (isA && isB) {
	  	 throttledAction();
	  }
	})


    return {
      showModal
    }
  }
}
</script>
<template>
	<div class="w-full h-screen bg-gray-900 flex justify-center items-center">
		<div>
			<h1 class="text-white tracking-[1px]">Please press A + B, there will be a surprise for you.</h1>
		</div>
	</div>

	<teleport to="body">
      <div 
      v-if="showModal" 
      class="fixed w-full h-screen bg-gray-900/30 flex justify-center items-center z-50">
      	<div class="w-[360px] h-[360px] rounded-[10px] w-full p-4 flex justify-center items-center bg-white relative">
      		<div @click="showModal = false" class="absolute top-4 right-4 hover:bg-gray-100 rounded-[2px]">
      			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 fill-gray-900">
						  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
      		</div>
      		<p class="tracking-[5px] text-[72px]">Oh!No...</p>
      	</div>
      </div>
    </teleport>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

  body,html {
  	font-family: 'Anton', sans-serif;
  }
</style>