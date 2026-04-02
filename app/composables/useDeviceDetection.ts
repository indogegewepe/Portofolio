export const useDeviceDetection = () => {
  const isAndroid = import.meta.client && /Android/i.test(navigator.userAgent)
  return { isAndroid }
}
