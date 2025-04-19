<template>
  <div class="train-container" ref="trainContainer">
    <img 
      src="../assets/train-svgrepo-com.svg" 
      class="animated-train" 
      ref="train"
      :style="{
        transform: `translate(${trainPosition.x}px, ${trainPosition.y}px) rotate(${trainRotation}deg)`,
        transition: 'transform 0.1s ease-out'
      }"
    />
    <img
      src="../assets/thomas.JPG"
      class="thomas-image"
      :class="{ 'thomas-visible': isThomasVisible }"
      :style="{
        transform: `translate(${thomasPosition.x}px, ${thomasPosition.y}px) scale(${thomasScale}) rotate(${thomasRotation}deg)`,
        transition: 'transform 0.1s ease-out'
      }"
    />
    <audio 
      v-for="i in 5" 
      :key="i" 
      :ref="el => { if (el) audioElements[i-1] = el }"
      preload="auto"
    >
      <source src="../assets/toot-toot.m4a" type="audio/mp4">
    </audio>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import trainSoundFile from '../assets/toot-toot.m4a'

const trainContainer = ref<HTMLElement | null>(null)
const train = ref<HTMLElement | null>(null)
const trainPosition = ref({ x: 0, y: 0 })
const thomasPosition = ref({ x: 0, y: 0 })
const trainRotation = ref(0)
const thomasRotation = ref(0)
const mousePosition = ref({ x: 0, y: 0 })
const randomOffset = ref({ x: 0, y: 0 })
const isThomasVisible = ref(false)
const thomasScale = ref(1)
let animationFrame: number
let soundInterval: number
const audioElements: HTMLAudioElement[] = []
let audioIndex = 0
let soundCount = 0

const getRandomDelay = () => {
  // Returns a random delay between 2 and 8 seconds
  return Math.random() * 9000 + 4000
}

const updateThomasPosition = () => {
  if (!trainContainer.value) return

  const containerRect = trainContainer.value.getBoundingClientRect()
  // Add more distance from the cursor for Thomas
  const targetX = mousePosition.value.x - containerRect.left + (randomOffset.value.x * 2)
  const targetY = mousePosition.value.y - containerRect.top + (randomOffset.value.y * 2)

  // Slower movement for Thomas to create more distance
  thomasPosition.value.x += (targetX - thomasPosition.value.x) * 0.05
  thomasPosition.value.y += (targetY - thomasPosition.value.y) * 0.05
  
  // Update rotation
  thomasRotation.value = (thomasRotation.value + 2) % 360
}

const playTrainSound = () => {
  if (audioElements.length === 0) return

  try {
    // Create multiple sound sources for overlapping effect
    const numSounds = Math.random() < 0.3 ? 2 : 1 // 30% chance of double sound
    
    for (let i = 0; i < numSounds; i++) {
      const audio = audioElements[audioIndex]
      audioIndex = (audioIndex + 1) % audioElements.length
      
      // Reset and prepare the audio element
      audio.currentTime = 0
      audio.volume = Math.random() * 0.3 + 0.7 // Randomize volume (0.7-1.0)
      audio.playbackRate = Math.random() * 0.2 + 0.9 // Randomize speed (0.9-1.1)
      
      // Add slight delay between overlapping sounds (0-200ms)
      const delay = i * (Math.random() * 200)
      setTimeout(() => {
        audio.play().catch(err => console.error('Error playing sound:', err))
        // Show Thomas image and increase scale more rapidly
        soundCount++
        thomasScale.value = Math.min(15, 1 + (soundCount * 1.2)) // Increased growth rate
        isThomasVisible.value = true
        
        // Hide Thomas when the sound ends
        audio.onended = () => {
          isThomasVisible.value = false
        }
      }, delay)
    }
  } catch (error) {
    console.error('Error playing sound:', error)
  }
}

const updateRandomOffset = () => {
  randomOffset.value = {
    x: (Math.random() - 0.5) * 100,
    y: (Math.random() - 0.5) * 100
  }
}

const updateTrainPosition = () => {
  if (!train.value || !trainContainer.value) return

  const containerRect = trainContainer.value.getBoundingClientRect()
  const targetX = mousePosition.value.x - containerRect.left + randomOffset.value.x
  const targetY = mousePosition.value.y - containerRect.top + randomOffset.value.y

  // Smooth movement
  trainPosition.value.x += (targetX - trainPosition.value.x) * 0.1
  trainPosition.value.y += (targetY - trainPosition.value.y) * 0.1

  // Calculate rotation based on movement direction
  const dx = targetX - trainPosition.value.x
  const dy = targetY - trainPosition.value.y
  trainRotation.value = Math.atan2(dy, dx) * (180 / Math.PI)

  // Update Thomas position
  updateThomasPosition()

  animationFrame = requestAnimationFrame(updateTrainPosition)
}

const handleMouseMove = (e: MouseEvent) => {
  mousePosition.value = { x: e.clientX, y: e.clientY }
}

const scheduleNextSound = () => {
  const delay = getRandomDelay()
  soundInterval = window.setTimeout(() => {
    playTrainSound()
    scheduleNextSound()
  }, delay)
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  updateRandomOffset()
  setInterval(updateRandomOffset, 2000) // Change random offset every 2 seconds
  updateTrainPosition()
  scheduleNextSound() // Start the sound sequence
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  cancelAnimationFrame(animationFrame)
  clearTimeout(soundInterval)
})
</script>

<style scoped>
.train-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
}

.animated-train {
  position: absolute;
  width: 50px;
  height: 50px;
  transform-origin: center;
  will-change: transform;
}

.thomas-image {
  position: absolute;
  width: 150px; /* Increased base size */
  height: auto;
  opacity: 0;
  transition: opacity 0.3s ease-out;
  z-index: 1001;
  transform-origin: center;
}

.thomas-visible {
  opacity: 1;
}

audio {
  display: none;
}
</style> 