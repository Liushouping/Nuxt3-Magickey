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
	    setTimeout(() => {
	      showModal.value = false;
	    }, 3000);
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
			<h1 class="text-white tracking-[2px] capitalize">Please press A + B, there will be a surprise for you.</h1>
			<div class="flex flex-row pt-4 space-x-4">
				<span 
				:class="{ 'bg-gray-50': A,'bg-green-200 text-green-50': !A }"
				class="text-gray-300 rounded-[2px] px-4 py-2 border-2 border-gray-200" >A</span>
				<span class="flex justify-center items-center text-[24px] text-white">+</span>
				<span 
				:class="{ 'bg-gray-50': B,'bg-green-200 text-green-50': !B }"
				class="text-gray-300 rounded-[2px] px-4 py-2 border-2 border-gray-200">B</span>
			</div>
		</div>

		<teleport to="body">
			<Transition 
			enter-active-class="animate__animated animate__tada"
    	leave-active-class="animate__animated animate__bounceOutRight">
	    <div 
	    v-if="showModal" 
	    class="fixed w-full h-screen bg-gray-900/30 flex justify-center items-center z-50">
	    	<NuxtIndex />
	    </div>
	    </Transition>
	  </teleport>
	</div>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
  @import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
  body,html {
  	font-family: 'Anton', sans-serif;
  };

  .slide-fade-enter-active {
	  transition: all 0.3s ease-out;
	}

	.slide-fade-leave-active {
	  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
	}

	.slide-fade-enter-from,
	.slide-fade-leave-to {
	  transform: translateX(-2000px);
	  opacity: 0;
	}
</style>