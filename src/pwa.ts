//@ts-nocheck

import { registerSW } from 'virtual:pwa-register'

if (typeof window !== "undefined" && typeof navigator !== "undefined") {
  
  console.log("registering service-worker");
  
  registerSW({
    immediate: true,
    onRegisteredSW(swScriptUrl) {
      // eslint-disable-next-line no-console
      console.log('SW registered: ', swScriptUrl)
    },
    onOfflineReady() {
      // eslint-disable-next-line no-console
      console.log('PWA application ready to work offline')
    },
  })
  
}