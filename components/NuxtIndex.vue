<template>
	<div class="relative w-full h-screen flex justify-center items-center z-50 bg-gray-800">
		<div class="absolute flex flex-col space-y-2">
			<div 
			v-for="i in 6"
			class="flex w-max animate-move-left movelft leading-none bg-gray-900" 
			style="animation-play-state:running">
				<div 
				v-for="i in 24" 
				class="w-fit px-6 text-[82px] sm:text-[210px] md:text-[180px] xl:text-[120px] 2xl:text-[168px] font-bold text-white">On No
				</div>
			</div>
		</div>
	</div>
</template>

<style>
.movelft {
	-webkit-animation: moveLeft 60s linear 0s infinite normal none;
  animation: moveLeft 60s linear 0s infinite normal none;
}
.animate-move-left:nth-child(1) {
	opacity: 65%;
}
.animate-move-left:nth-child(2) {
	padding-left: 20px;
	opacity: 70%;
}
.animate-move-left:nth-child(3) {
	padding-left: 40px;
	opacity: 90%;
}
.animate-move-left:nth-child(4) {
	padding-left: 60px;
	opacity: 95%;
}
.animate-move-left:nth-child(5) {
	padding-left: 80px;
	opacity: 100%;
}
.animate-move-left:nth-child(6) {
	padding-left: 100px;
	opacity: 100%;
}

@keyframes moveLeft {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
		transform: translate3d(-2000px, 0, 0);
  }
}
</style>