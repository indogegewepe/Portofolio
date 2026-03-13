export const useSnackbar = () => {
  const { $snackbar } = useNuxtApp()
  
  return {
    showSuccess: (message: string, timeout?: number) => 
      $snackbar.show(message, 'success', timeout),
    
    showError: (message: string, timeout?: number) => 
      $snackbar.show(message, 'error', timeout),
    
    showWarning: (message: string, timeout?: number) => 
      $snackbar.show(message, 'warning', timeout),
    
    showInfo: (message: string, timeout?: number) => 
      $snackbar.show(message, 'info', timeout),
    
    close: $snackbar.close
  }
}