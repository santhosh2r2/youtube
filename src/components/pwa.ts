import { registerSW } from 'virtual:pwa-register'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

window.addEventListener('load', () => {
  const pwaToast = document.querySelector<HTMLDivElement>('#pwa-toast')
  const pwaToastMessage = pwaToast?.querySelector<HTMLSpanElement>('.message #toast-message')
  const pwaCloseBtn = pwaToast?.querySelector<HTMLButtonElement>('#pwa-close')
  const pwaRefreshBtn = pwaToast?.querySelector<HTMLButtonElement>('#pwa-refresh')

  const installToast = document.querySelector<HTMLDivElement>('#install-toast')
  const installButton = installToast?.querySelector<HTMLButtonElement>('#install-btn')
  const installCloseButton = installToast?.querySelector<HTMLButtonElement>('#close-btn')

  let refreshSW: ((reloadPage?: boolean) => Promise<void>) | undefined
  let deferredPrompt: BeforeInstallPromptEvent | undefined

  if (!pwaToast || !pwaToastMessage || !pwaCloseBtn || !pwaRefreshBtn || !installToast || !installButton || !installCloseButton) {
    return
  }

  const refreshCallback = () => refreshSW?.(true)

  const updateInstallPrompt = () => {
    const installable = deferredPrompt !== undefined
    installButton.disabled = !installable
    installToast.classList.toggle('hide', !installable)
  }

  const hidePwaToast = (raf = false) => {
    if (raf) {
      requestAnimationFrame(() => hidePwaToast(false))
      return
    }
    if (pwaToast.classList.contains('refresh'))
      pwaRefreshBtn.removeEventListener('click', refreshCallback)

    pwaToast.classList.remove('show', 'refresh')
  }
  
  const showPwaToast = (offline: boolean) => {
    if (!offline)
      pwaRefreshBtn.addEventListener('click', refreshCallback)
    requestAnimationFrame(() => {
      hidePwaToast(false)
      if (!offline)
        pwaToast.classList.add('refresh')
      pwaToast.classList.add('show')
    })
  }

  pwaCloseBtn.addEventListener('click', () => hidePwaToast(true))
  installCloseButton.addEventListener('click', () => {
    installToast.classList.add('hide')
  })

  installButton.addEventListener('click', async () => {
    if (!deferredPrompt) {
      return
    }

    await deferredPrompt.prompt()
    await deferredPrompt.userChoice
    deferredPrompt = undefined
    updateInstallPrompt()
  })

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault()
    deferredPrompt = event as BeforeInstallPromptEvent
    updateInstallPrompt()
  })

  window.addEventListener('appinstalled', () => {
    deferredPrompt = undefined
    updateInstallPrompt()
  })

  updateInstallPrompt()

  refreshSW = registerSW({
    immediate: true,
    onOfflineReady() {
      pwaToastMessage.innerHTML = 'App ready to work offline'
      showPwaToast(true)
    },
    onNeedRefresh() {
      pwaToastMessage.innerHTML = 'New content available, click on reload button to update'
      showPwaToast(false)
    },
    onRegisteredSW(swScriptUrl) {
      console.log('SW registered: ', swScriptUrl)
    }
  })
})

