<script>
import { useMagicKeys, useThrottleFn } from '@vueuse/core';
import { Howl } from 'howler';
export default {
  setup() {
    const showModal = ref(false);
    const showError = ref(false);
    const A = ref(true);
    const B = ref(true);
    const C = ref(true);
    const D = ref(true);
    const E = ref(true);
    const message = ref("Please press A + B, there will be a surprise for you.")
    const sound = new Howl({
		  src: ['/audio/sound.mp3']
		});
		const key = new Howl({
		  src: ['/audio/key.mp3']
		});
		const { a, b, c, d, e } = useMagicKeys();

		const throttledAction = useThrottleFn(() => {
			showModal.value = true;
	    setTimeout(() => {
	      showModal.value = false;
	    }, 3500);
	    sound.play();
	  }, 2000);

	  const throttledActionError = useThrottleFn(() => {
			showError.value = true;
	    setTimeout(() => {
	      showError.value = false;
	    }, 3500);
	    key.play();
	  }, 2000);

		watch([a], ([isAA]) => {
		  if (isAA) {
		  	key.play();
		  	A.value = false;
		  } else {
		  	key.play();
		  	A.value = true;
		  }
		})
		watch([b], ([isBB]) => {
		  if (isBB) {
		  	key.play();
		  	B.value = false;
		  } else {
		  	key.play();
		  	B.value = true;
		  }
		})
		watch([c], ([isCC]) => {
		  if (isCC) {
		  	key.play();
		  	C.value = false;
		  } else {
		  	key.play();;
		  	C.value = true
		  }
		})
		watch([d], ([isDD]) => {
		  if (isDD) {
		  	key.play();
		  	D.value = false;
		  } else {
		  	key.play();;
		  	D.value = true
		  }
		})
		watch([e], ([isEE]) => {
		  if (isEE) {
		  	throttledActionError();
		  	E.value = false;
		  } else {
		  	key.play();;
		  	E.value = true
		  }
		})
		watch([a, b], ([isA, isB]) => {
		  if (isA && isB) {
		  	sound.play();
		  	throttledAction();
		  }
		})

		useHead({
		  title: '一頁式網站｜按鍵彈出彩蛋',
		  meta: [
		    { name: 'description', content: '一頁式網站｜按鍵彈出彩蛋' }
		  ],
		})
    return {
      showModal,showError,A,B,C,D,E,message
    }
  }
}
</script>
<template>
	<div class="bg-yellow-400 sm:p-10 w-full h-screen">

	<div class="w-full h-full bg-gray-900 rounded-[5px] flex justify-center items-center">
			
		<div class="flex flex-col">
			<h1 class="text-[14px] sm:text-[24px] text-yellow-300 tracking-[1px] capitalize">{{ message }}</h1>
			<div class="flex flex-row pt-4 space-x-4">
				<span 
				:class="{ 'bg-gray-50': A,'bg-green-200 text-green-400 border-green-400': !A }"
				class="text-[18px] text-gray-300 rounded-[2px] px-2 sm:px-4 py-1 sm:py-2 border-2 border-gray-200" >A</span>
				<span class="flex justify-center items-center text-[24px] text-white">+</span>
				<span 
				:class="{ 'bg-gray-50': B,'bg-green-200 text-green-400 border-green-400': !B }"
				class="ttext-[18px] text-gray-300 rounded-[2px] px-2 sm:px-4 py-1 sm:py-2 border-2 border-gray-200">B</span>
			</div>

			<div class="flex flex-row pt-4 space-x-4">
				<span 
				:class="{ 'bg-gray-50': C,'bg-green-200 text-green-400 border-green-400': !C }"
				class="text-[18px] text-gray-300 rounded-[2px] px-2 sm:px-4 py-1 sm:py-2 border-2 border-gray-200" >C</span>
				<span 
				:class="{ 'bg-gray-50': D,'bg-green-200 text-green-400 border-green-400': !D }"
				class="text-[18px] text-gray-300 rounded-[2px] px-2 sm:px-4 py-1 sm:py-2 border-2 border-gray-200" >D</span>
				<span 
				:class="{ 'bg-gray-50': E,'bg-green-200 text-green-400 border-green-400': !E }"
				class="text-[18px] text-gray-300 rounded-[2px] px-2 sm:px-4 py-1 sm:py-2 border-2 border-gray-200" >E</span>
			</div>
		</div>

	</div>

	</div>
	<!-- Show Modal -->
	<teleport to="body">
		<Transition 
		enter-active-class="animate__animated animate__tada"
    leave-active-class="animate__animated animate__bounceOutRight">
	    <div 
	    v-if="showModal" 
	    class="fixed w-full h-screen flex justify-center items-center z-50">
	    	<NuxtIndex info="On No" bg="bg-yellow-400"/>
	    </div>
	  </Transition>
	</teleport>
	<!-- Error Modal -->
	<teleport to="body">
		<Transition 
		enter-active-class="animate__animated animate__tada"
    leave-active-class="animate__animated animate__bounceOutRight">
	    <div 
	    v-if="showError" 
	    class="fixed w-full h-screen flex justify-center items-center z-50">
	    	<NuxtIndex info="Error Error" bg="bg-red-900"/>
	    </div>
	  </Transition>
	</teleport>

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