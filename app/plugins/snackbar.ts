import { reactive } from 'vue'

interface SnackbarState {
  visible: boolean
  message: string
  color: string
  timeout: number
}

type SnackbarColor = 'success' | 'error' | 'warning' | 'info'

export default defineNuxtPlugin(() => {
  const state = reactive<SnackbarState>({
    visible: false,
    message: '',
    color: '',
    timeout: 3000
  })

  let timeoutId: ReturnType<typeof setTimeout> | null = null
  
  function show(
    message: string,
    color: SnackbarColor = 'info',
    timeout: number = 3000,
    _icon?: string
  ) {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }

    state.message = message
    state.color = color
    state.timeout = timeout
    state.visible = true

    if (timeout > 0) {
      timeoutId = setTimeout(() => {
        close()
      }, timeout)
    }
  }

  function close() {
    state.visible = false
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  return {
    provide: {
      snackbar: {
        ...toRefs(state),
        show,
        close,
      },
    },
  }
})