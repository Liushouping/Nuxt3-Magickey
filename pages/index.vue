<script>
import { useMagicKeys, useThrottleFn } from '@vueuse/core';
import { Howl } from 'howler';
export default {
  setup() {
    const showModal = ref(false);
    const A = ref(true);
    const B = ref(true);
    const sound = new Howl({
		  src: ['/audio/sound.mp3']
		});
		const { b, a } = useMagicKeys();

		const throttledAction = useThrottleFn(() => {
	    showModal.value = true;
	    sound.play();
	  }, 2000);

		watch([a], ([isAA]) => {
		  if (isAA) {
		  	A.value = false
		  } else {
		  	A.value = true
		  }
		})
		watch([b], ([isBB]) => {
		  if (isBB) {
		  	B.value = false
		  } else {
		  	B.value = true
		  }
		})
		watch([a, b], ([isA, isB]) => {
		  if (isA && isB) {
		  	 throttledAction();
		  }
		})


    return {
      showModal,A,B
    }
  }
}
</script>
<template>
	<div class="w-full h-screen bg-gray-900 flex justify-center items-center">
		<div class="flex flex-col">
			<h1 class="text-white tracking-[1px]">Please press A + B, there will be a surprise for you.</h1>
			<div class="flex flex-row pt-4 space-x-4">
				<span 
				:class="{ 'bg-gray-50': A,'bg-green-200 text-green-50': !A }"
				class="text-gray-400 rounded-[2px] px-4 py-2" >A</span>
				<span 
				:class="{ 'bg-gray-50': B,'bg-green-200 text-green-50': !B }"
				class="text-gray-400 rounded-[2px] px-4 py-2">B</span>
			</div>
		</div>
	</div>

	<teleport to="body">
      <div 
      v-if="showModal" 
      class="fixed w-full h-screen bg-gray-900/30 flex justify-center items-center z-50">
      	<div class="w-[320px] h-[320px] rounded-[10px] p-4 flex justify-center items-center bg-white relative">
      		<div @click="showModal = false;A = true,B = true;" class="absolute top-4 right-4 hover:bg-gray-100 rounded-[2px]">
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